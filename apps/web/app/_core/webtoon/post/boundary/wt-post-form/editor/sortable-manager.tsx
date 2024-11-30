"use client";

import { createContext, useContext, useMemo, useRef, useState } from "react";
import { createStore, useStore } from "zustand";
import { useWTPostFormContext } from "../wt-post-form";
import { useController } from "react-hook-form";
import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { varAlpha } from "@pency/ui/util";
import { DIVIDER_CUT_ID, SortableCut, SortableDividerCut } from "./sortable-cut";

// ----------------------------------------------------------------------

type ActiveCutIdsStore = {
  activeCutIds: Set<string>;
  toggleActiveCutId: (src: string) => void;
  clear: () => void;
};

const createActiveCutIdsStore = () => {
  return createStore<ActiveCutIdsStore>()((set) => ({
    activeCutIds: new Set(),
    toggleActiveCutId: (src) => {
      set(({ activeCutIds }) => {
        const newActiveCuts = new Set(activeCutIds);

        if (newActiveCuts.has(src)) {
          newActiveCuts.delete(src);
        } else {
          newActiveCuts.add(src);
        }

        return {
          activeCutIds: newActiveCuts,
        };
      });
    },
    clear: () => set(() => ({ activeCutIds: new Set() })),
  }));
};

const ActiveCutIdsContext = createContext<ReturnType<typeof createActiveCutIdsStore> | undefined>(undefined);

export const useActiveCutIdsContext = <T,>(selector: (state: ActiveCutIdsStore) => T): T => {
  const context = useContext(ActiveCutIdsContext);

  if (!context) throw new Error(`부모로 <SortableManager /> 컴포넌트가 있어야 합니다.`);

  return useStore(context, selector);
};

// ----------------------------------------------------------------------

const MIMES = ["image/jpeg", "image/png", "image/gif"] as const;

export const SortableManager = () => {
  const { control } = useWTPostFormContext();
  const {
    field: {
      value: { free, paid },
      onChange,
    },
  } = useController({ control, name: "content" });

  const [activeCutIdsStore] = useState(createActiveCutIdsStore);
  const store = useStore(activeCutIdsStore);

  const scrollerRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();

  const handleRemove = () => {
    const activeCuts = Array.from(store.activeCutIds);

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
          <SortableDividerCut />
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

  return (
    <SortableContext items={items} strategy={horizontalListSortingStrategy}>
      <ActiveCutIdsContext.Provider value={activeCutIdsStore}>
        <Stack gap={1}>
          <Typography variant="subtitle2">원고 등록</Typography>
          {free.length !== 0 || paid.length !== 0 ? (
            <>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="soft" color="primary" onClick={handleUpload}>
                  업로드
                </Button>
                {store.activeCutIds.size !== 0 && (
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
      </ActiveCutIdsContext.Provider>
    </SortableContext>
  );
};

// ----------------------------------------------------------------------
