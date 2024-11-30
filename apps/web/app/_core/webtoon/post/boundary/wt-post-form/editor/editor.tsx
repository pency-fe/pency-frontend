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
import { useMemo, useState } from "react";
import { Portal } from "@mui/material";

const DIVIDER_CUT_ID = "divider-cut";

type DndManagerFnProps = {
  children?: React.ReactNode;
};

const DndManagerFn = ({ children }: DndManagerFnProps) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const { control } = useWTPostFormContext();
  const {
    field: {
      value: { free, paid },
      onChange,
    },
  } = useController({ control, name: "content" });
  const [draggedCutId, setDraggedCutId] = useState<string | null>(null);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setDraggedCutId(active.id as string);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setDraggedCutId(null);

    if (over && active.id !== over.id) {
      const boundary = { name: DIVIDER_CUT_ID, src: DIVIDER_CUT_ID };

      const oldContent = [...free, boundary, ...paid];

      const oldIndex = oldContent.findIndex(({ src }) => src === active.id);
      const newIndex = oldContent.findIndex(({ src }) => src === over.id);

      const newContent = arrayMove(oldContent, oldIndex, newIndex);
      const boundaryIndex = newContent.findIndex(({ src }) => src === DIVIDER_CUT_ID);

      onChange({ free: newContent.slice(0, boundaryIndex), paid: newContent.slice(boundaryIndex + 1) });
    }
  };

  const items = useMemo(
    () => [...free.map(({ src }) => src), DIVIDER_CUT_ID, ...paid.map(({ src }) => src)],
    [free, paid],
  );

  return (
    <>
      <DndContext
        id="dnd-manager"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          {children}
        </SortableContext>
      </DndContext>
      <Portal>
        <DragOverlay>{draggedCutId && draggedCutId !== DIVIDER_CUT_ID ? <></> : <></>}</DragOverlay>
      </Portal>
    </>
  );
};
