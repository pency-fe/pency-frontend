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
import { PAID_BOUNDARY_ID } from "./sortable-cut";

const EditorFn = () => {
  const { setValue, watch } = useWTPostFormContext();
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [activeCutId, setActiveCutId] = useState<string | null>(null);

  const content = watch("content");

  function handleDragStart({ active }: DragStartEvent) {
    setActiveCutId(active.id as string);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveCutId(null);

    if (over && active.id !== over.id) {
      const boundary = { name: PAID_BOUNDARY_ID, src: PAID_BOUNDARY_ID };
      const oldContent = [...content.free, boundary, ...content.paid];

      const oldIndex = oldContent.findIndex(({ src }) => src === active.id);
      const newIndex = oldContent.findIndex(({ src }) => src === over.id);

      const newContent = arrayMove(oldContent, oldIndex, newIndex);
      const boundaryIndex = newContent.findIndex(({ src }) => src === PAID_BOUNDARY_ID);

      setValue("content", {
        free: newContent.slice(0, boundaryIndex),
        paid: newContent.slice(boundaryIndex + 1),
      });
    }
  }
  console.log(1);

  return (
    <DndContext
      id="wt-post-form-editor"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={[...content.free.map(({ src }) => src), PAID_BOUNDARY_ID, ...content.paid.map(({ src }) => src)]}
        strategy={horizontalListSortingStrategy}
      >
        <SortableCutManager />
      </SortableContext>

      <Portal>
        <DragOverlay>
          {activeCutId && activeCutId !== PAID_BOUNDARY_ID ? (
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
