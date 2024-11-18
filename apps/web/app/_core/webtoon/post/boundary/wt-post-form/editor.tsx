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
import { useWTPostFormContext } from "./wt-post-form";
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import { Portal } from "@mui/material";
import { Cut, PaidBoundaryCut } from "./cut";
import { SortableCutManager } from "./sortable-cut-manager";

const EditorFn = () => {
  const { getValues, setValue } = useWTPostFormContext();
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [activeCutId, setActiveCutId] = useState<string | null>(null);

  function handleDragStart({ active }: DragStartEvent) {
    setActiveCutId(active.id as string);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveCutId(null);

    if (over && active.id !== over.id) {
      const oldIndex = getValues("content").findIndex(({ src }) => src === active.id);
      const newIndex = getValues("content").findIndex(({ src }) => src === over.id);

      setValue("content", arrayMove(getValues("content"), oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      id="wt-post-form-editor"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={getValues("content").map(({ src }) => src)} strategy={horizontalListSortingStrategy}>
        <SortableCutManager />
      </SortableContext>

      <Portal>
        <DragOverlay>
          {activeCutId && activeCutId !== "paid-boundary-cut" ? (
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
};

// ----------------------------------------------------------------------

export const Editor = Object.assign(EditorFn);
