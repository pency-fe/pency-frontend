"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useWTPostFormContext } from "./wt-post-form";
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useId, useState } from "react";
import { Grid, Portal } from "@mui/material";
import { SortableCut } from "./sortable-cut";
import { Cut } from "./cut";
import { SortableCutManager } from "./sortable-cut-manager";

const EditorFn = () => {
  const { getValues, setValue, watch } = useWTPostFormContext();
  const content = watch("content");
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [activeCut, setActiveCut] = useState<string | null>(null);
  const id = useId();

  function handleDragStart({ active }: DragStartEvent) {
    setActiveCut(active.id as string);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveCut(null);

    if (over && active.id !== over.id) {
      const oldIndex = getValues("content").indexOf(active.id as string);
      const newIndex = getValues("content").indexOf(over.id as string);

      setValue("content", arrayMove(getValues("content"), oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      id={id}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={content} strategy={horizontalListSortingStrategy}>
        <SortableCutManager>
          <Grid container wrap="nowrap" sx={{ width: 1, overflowX: "auto", gap: 1, padding: "4px", ml: "-4px" }}>
            {getValues("content").map((src) => (
              <Grid key={src} item xs={3.5} sm={2.5} sx={{ flexShrink: 0 }}>
                <SortableCut src={src} />
              </Grid>
            ))}
          </Grid>
        </SortableCutManager>
      </SortableContext>
      <Portal>
        <DragOverlay>{activeCut && <Cut src={activeCut} />}</DragOverlay>
      </Portal>
    </DndContext>
  );
};

// ----------------------------------------------------------------------

export const Editor = Object.assign(EditorFn);
