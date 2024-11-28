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
import { useEffect, useState } from "react";
import { Portal } from "@mui/material";
import { Cut, PaidBoundaryCut } from "./cut";
import { SortableCutManager } from "./sortable-cut-manager";

const EditorFn = () => {
  const { setValue, watch } = useWTPostFormContext();
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [activeCutId, setActiveCutId] = useState<string | null>(null);

  const [free, paid] = watch(["free", "paid"]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveCutId(active.id as string);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveCutId(null);

    if (over && active.id !== over.id) {
      const boundary = { name: "paid-boundary-cut", src: "paid-boundary-cut" };
      const oldContent = [...free, boundary, ...paid];
      const oldIndex = oldContent.findIndex(({ src }) => src === active.id);
      const newIndex = oldContent.findIndex(({ src }) => src === over.id);
      const newContent = arrayMove(oldContent, oldIndex, newIndex);
      const boundaryIndex = newContent.findIndex(({ src }) => src === "paid-boundary-cut");
      setValue("free", newContent.slice(0, boundaryIndex));
      setValue("paid", newContent.slice(boundaryIndex + 1));
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
      id="wt-post-form-editor"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={[...free.map(({ src }) => src), "paid-boundary-cut", ...paid.map(({ src }) => src)]}
        strategy={horizontalListSortingStrategy}
      >
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
