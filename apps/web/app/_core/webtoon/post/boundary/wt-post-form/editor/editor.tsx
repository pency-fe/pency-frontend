import { useController } from "react-hook-form";
import { useWTPostFormContext } from "../wt-post-form";
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
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { createContext, useContext, useMemo, useState } from "react";
import { Portal, Stack, Typography } from "@mui/material";
import { createStore, useStore } from "zustand";

const DIVIDER_CUT_ID = "divider-cut";

type DndManagerFnProps = {
  children?: React.ReactNode;
};

const DndManagerFn = ({ children }: DndManagerFnProps) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const { getValues, setValue } = useWTPostFormContext();
  const [draggedCutId, setDraggedCutId] = useState<string | null>(null);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setDraggedCutId(active.id as string);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setDraggedCutId(null);

    if (over && active.id !== over.id) {
      const boundary = { name: DIVIDER_CUT_ID, src: DIVIDER_CUT_ID };

      const oldContent = [...getValues("content.free"), boundary, ...getValues("content.paid")];

      const oldIndex = oldContent.findIndex(({ src }) => src === active.id);
      const newIndex = oldContent.findIndex(({ src }) => src === over.id);

      const newContent = arrayMove(oldContent, oldIndex, newIndex);
      const boundaryIndex = newContent.findIndex(({ src }) => src === DIVIDER_CUT_ID);

      setValue("content", { free: newContent.slice(0, boundaryIndex), paid: newContent.slice(boundaryIndex + 1) });
    }
  };

  return (
    <>
      <DndContext
        id="dnd-manager"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {children}
      </DndContext>
      <Portal>
        <DragOverlay>{draggedCutId && draggedCutId !== DIVIDER_CUT_ID ? <></> : <></>}</DragOverlay>
      </Portal>
    </>
  );
};

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

function useActiveCutIdsContext<T>(selector: (state: ActiveCutIdsStore) => T): T {
  const context = useContext(ActiveCutIdsContext);

  if (!context) throw new Error(`부모로 <SortableManager /> 컴포넌트가 있어야 합니다.`);

  return useStore(context, selector);
}

// ----------------------------------------------------------------------

type SortableManagerFnProps = {
  children?: React.ReactNode;
};

const SortableManagerFn = ({ children }: SortableManagerFnProps) => {
  const { control } = useWTPostFormContext();
  const {
    field: {
      value: { free, paid },
      onChange,
    },
  } = useController({ control, name: "content" });

  const [activeCutIdsStore] = useState(createActiveCutIdsStore);
  const store = useStore(activeCutIdsStore);

  const items = useMemo(
    () => [...free.map(({ src }) => src), DIVIDER_CUT_ID, ...paid.map(({ src }) => src)],
    [free, paid],
  );

  return (
    <SortableContext items={items} strategy={horizontalListSortingStrategy}>
      <ActiveCutIdsContext.Provider value={activeCutIdsStore}>
        <Stack gap={1}>
          <Typography variant="subtitle2">원고 등록</Typography>
        </Stack>
      </ActiveCutIdsContext.Provider>
    </SortableContext>
  );
};
