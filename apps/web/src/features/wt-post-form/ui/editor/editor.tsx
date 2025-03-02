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
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { Portal } from "@mui/material";
import { SortableManager } from "./sortable-manager";
import { Cut, DividerCut } from "./cut";
import { DIVIDER_CUT_ID } from "./const";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../../model/form-schema";

export const Editor = () => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const { getValues, setValue } = useFormContext<FormSchema>();
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

  useEffect(() => {
    const isReallyExit = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", isReallyExit);
    return () => window.removeEventListener("beforeunload", isReallyExit);
  }, []);

  return (
    <DndContext
      id="dnd-manager"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableManager />
      <Portal>
        <DragOverlay>
          {draggedCutId && draggedCutId !== DIVIDER_CUT_ID ? <Cut src={draggedCutId} /> : <DividerCut hidePrice />}
        </DragOverlay>
      </Portal>
    </DndContext>
  );
};
