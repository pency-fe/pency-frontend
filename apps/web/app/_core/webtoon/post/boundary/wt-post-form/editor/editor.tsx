"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useWTPostFormContext } from "../wt-post-form";
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Grid, Portal, Stack, Typography, useTheme } from "@mui/material";
import { Cut, PaidBoundaryCut } from "../cut";
import { useController } from "react-hook-form";
import { createStore, useStore } from "zustand";
import { SortableCut, SortablePaidBoundaryCut } from "../sortable-cut";
import { varAlpha } from "@pency/ui/util";

const DIVIDER_CUT_ID = "divider-cut";

type ActiveCutsStore = {
  activeCuts: Set<string>;
  toggleActiveCut: (src: string) => void;
  clear: () => void;
};

const createActiveCutsStore = () => {
  return createStore<ActiveCutsStore>()((set) => ({
    activeCuts: new Set(),
    toggleActiveCut: (src) => {
      set(({ activeCuts }) => {
        const newActiveCuts = new Set(activeCuts);

        if (newActiveCuts.has(src)) {
          newActiveCuts.delete(src);
        } else {
          newActiveCuts.add(src);
        }

        return {
          activeCuts: newActiveCuts,
        };
      });
    },
    clear: () => set(() => ({ activeCuts: new Set() })),
  }));
};

const ActiveCutsContext = createContext<ReturnType<typeof createActiveCutsStore> | undefined>(undefined);

export function useActiveCutsContext<T>(selector: (state: ActiveCutsStore) => T): T {
  const context = useContext(ActiveCutsContext);

  if (!context) throw new Error(`부모로 <Editor /> 컴포넌트가 있어야 합니다.`);

  return useStore(context, selector);
}

const MIMES = ["image/jpeg", "image/png", "image/gif"] as const;

export function Editor() {
  const { control } = useWTPostFormContext();
  const {
    field: {
      value: { free, paid },
      onChange,
    },
  } = useController({ control, name: "content" });

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [activeCutId, setActiveCutId] = useState<string | null>(null);

  const [activeCutsStore] = useState(createActiveCutsStore);
  const store = useStore(activeCutsStore);

  const scrollerRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();

  const handleDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      setActiveCutId(active.id as string);
    },
    [setActiveCutId],
  );

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      setActiveCutId(null);

      if (over && active.id !== over.id) {
        const boundary = { name: DIVIDER_CUT_ID, src: DIVIDER_CUT_ID };

        const oldContent = [...free, boundary, ...paid];

        const oldIndex = oldContent.findIndex(({ src }) => src === active.id);
        const newIndex = oldContent.findIndex(({ src }) => src === over.id);

        const newContent = arrayMove(oldContent, oldIndex, newIndex);
        const boundaryIndex = newContent.findIndex(({ src }) => src === DIVIDER_CUT_ID);

        onChange({ free: newContent.slice(0, boundaryIndex), paid: newContent.slice(boundaryIndex + 1) });
      }
    },
    [setActiveCutId, free, paid, onChange],
  );

  const handleRemove = () => {
    const activeCuts = Array.from(store.activeCuts);

    onChange({
      free: free.filter(({ src }) => !activeCuts.includes(src)),
      paid: paid.filter(({ src }) => !activeCuts.includes(src)),
    });

    store.clear();
  };

  const handleUpload = () => {
    const picker = document.createElement("input");
    picker.type = "file";
    picker.accept = MIMES.join(",");
    picker.multiple = true;
    picker.addEventListener("change", () => {
      if (picker.files?.length) {
        const newCuts = [];
        for (const file of picker.files) {
          const src = URL.createObjectURL(file);
          newCuts.push({
            name: src,
            src: src,
          });
        }

        if (paid.length) {
          onChange({
            free,
            paid: [...paid, ...newCuts],
          });
        } else {
          onChange({
            free: [...free, ...newCuts],
            paid,
          });
        }

        setTimeout(() => {
          scrollerRef.current?.scrollTo({
            left: scrollerRef.current.scrollWidth,
            behavior: "smooth",
          });
        }, 200);
      }
    });
    picker.click();
  };

  const items = useMemo(
    () => [...free.map(({ src }) => src), DIVIDER_CUT_ID, ...paid.map(({ src }) => src)],
    [free, paid],
  );

  const renderCuts = useMemo(
    () => (
      <>
        {free.map(({ src, name }, i) => (
          <Grid key={i} item xs={3.5} sm={2.5} sx={{ flexShrink: 0 }}>
            <SortableCut src={src} name={name} order={i + 1} />
          </Grid>
        ))}
        <Grid item xs={3.5} sm={2.5} sx={{ flexShrink: 0 }}>
          <SortablePaidBoundaryCut />
        </Grid>
        {paid.map(({ src, name }, i) => (
          <Grid key={i} item xs={3.5} sm={2.5} sx={{ flexShrink: 0 }}>
            <SortableCut src={src} name={name} order={i + free.length + 1} />
          </Grid>
        ))}
      </>
    ),
    [free, paid],
  );

  useEffect(() => {
    const isReallyExit = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", isReallyExit);

    return () => window.removeEventListener("beforeunload", isReallyExit);
  }, []);
  return (
    <DndContext
      id="wt-post-form-editor"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <ActiveCutsContext.Provider value={activeCutsStore}>
          <Stack gap={1}>
            <Typography variant="subtitle2">원고 등록</Typography>
            {free.length !== 0 || paid.length !== 0 ? (
              <>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button variant="soft" color="primary" onClick={handleUpload}>
                    업로드
                  </Button>
                  {store.activeCuts.size !== 0 && (
                    <Button variant="soft" color="error" onClick={handleRemove}>
                      삭제
                    </Button>
                  )}
                </Box>
                <Grid ref={scrollerRef} container wrap="nowrap" sx={{ width: 1, overflowX: "scroll", ml: "-5px" }}>
                  {renderCuts}
                </Grid>

                <Box sx={{ aspectRatio: "1 / 1", overflow: "hidden" }}>
                  <Stack sx={{ width: 1, height: 1, overflowY: "scroll" }}>
                    {[...free, ...paid].map(({ src }, i) => (
                      <Box component="img" key={i} src={src} />
                    ))}
                  </Stack>
                </Box>
              </>
            ) : (
              <Grid
                container
                sx={{
                  width: 1,
                  justifyContent: "center",
                  bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.08),
                  borderRadius: 1,
                }}
              >
                <Grid item xs={3.5} sm={2.5} sx={{ position: "relative", width: 1 }}>
                  <Box sx={{ width: 1, pt: "100%" }}>
                    <Button
                      variant="soft"
                      color="primary"
                      onClick={handleUpload}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      업로드
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Stack>
        </ActiveCutsContext.Provider>
      </SortableContext>

      <Portal>
        <DragOverlay>
          {activeCutId && activeCutId !== DIVIDER_CUT_ID ? (
            <Cut
              slots={{
                image: (
                  <Cut.Image
                    src={activeCutId}
                    slots={{
                      dragDot: <Cut.Image.DragDot />,
                    }}
                  />
                ),
              }}
            />
          ) : (
            <PaidBoundaryCut slots={{ dragDot: <PaidBoundaryCut.DragDot /> }} />
          )}
        </DragOverlay>
      </Portal>
    </DndContext>
  );
}
