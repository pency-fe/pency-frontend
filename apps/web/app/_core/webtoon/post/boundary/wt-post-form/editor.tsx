// type EditorFnProps;

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useWTPostFormContext } from "./wt-post-form";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { Box, Grid, Portal } from "@mui/material";
import { LazyLoadComponent, LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";
import { CSS } from "@dnd-kit/utilities";

const EditorFn = () => {
  const { getValues, setValue } = useWTPostFormContext();
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const [activeCut, setActiveCut] = useState<string | null>(null);

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
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={getValues("content")} strategy={horizontalListSortingStrategy}>
        <Grid container>
          {getValues("content").map((src) => (
            <Cut key={src} src={src} />
          ))}
        </Grid>
      </SortableContext>
      <Portal>
        <DragOverlay>{activeCut && <Cut src={activeCut} />}</DragOverlay>
      </Portal>
    </DndContext>
  );
};

// ----------------------------------------------------------------------

type CutProps = Omit<LazyLoadImageProps, "src"> & { src: string };

const Cut = ({ src, ...rest }: CutProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: src });

  return (
    <Grid
      item
      xs={3}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 1,
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <Box component={LazyLoadImage} src={src} {...rest} sx={{ aspectRatio: "1/1" }} />
    </Grid>
  );
};

// ----------------------------------------------------------------------

const CutViewerFn = () => {};

export const Editor = Object.assign(EditorFn);
