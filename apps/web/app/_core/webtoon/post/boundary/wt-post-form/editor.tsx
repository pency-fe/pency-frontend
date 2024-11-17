"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DraggableSyntheticListeners,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
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
import { useId, useRef, useState } from "react";
import { Box, BoxProps, Grid, IconButton, Portal, useTheme } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CSS } from "@dnd-kit/utilities";
import { NimbusDragDotsIcon } from "@pency/ui/components";
import { stylesColorScheme, varAlpha } from "@pency/ui/util";
import TouchRipple, { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { useRipple } from "@pency/ui/hooks";

const EditorFn = () => {
  const { getValues, setValue } = useWTPostFormContext();
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
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
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={getValues("content")} strategy={horizontalListSortingStrategy}>
        <Grid container wrap="nowrap" sx={{ width: 1, overflowX: "auto", gap: 1 }}>
          {getValues("content").map((src) => (
            <SortableCut key={src} src={src} />
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

// zustand 이용하기

type SortableCutManagerProps = {};

const SortableCutManager = () => {};

// ----------------------------------------------------------------------

type SortableCutProps = { src: string };

const SortableCut = ({ src }: SortableCutProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: src,
  });
  const ripple = useRipple();

  // console.log(listeners);
  // {onMouseDown: ƒ, onTouchStart: ƒ, onKeyDown: ƒ}
  return (
    <Grid
      item
      xs={3.5}
      sm={2.5}
      ref={setNodeRef}
      {...attributes}
      tabIndex={-1}
      onMouseDown={ripple.start}
      onMouseUp={ripple.stop}
      sx={{
        flexShrink: 0,
        position: "relative",
        borderRadius: 1,
        overflow: "hidden",
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <TouchRipple ref={ripple.ref} center={false} style={{ zIndex: 1 }} />
      <Cut
        src={src}
        listeners={listeners}
        sx={{
          opacity: isDragging ? 0.24 : 1,
        }}
      />
    </Grid>
  );
};

// ----------------------------------------------------------------------

type CutProps = {
  src: string;
  listeners?: DraggableSyntheticListeners;
} & BoxProps;

const Cut = ({ src, listeners, ...rest }: CutProps) => {
  const theme = useTheme();

  return (
    <Box
      {...rest}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 1,
        overflow: "hidden",
        transition: theme.transitions.create(["opacity"], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.shorter,
        }),
        ...rest.sx,
      }}
    >
      <IconButton
        {...listeners}
        tabIndex={-1}
        disableRipple
        disableFocusRipple
        disableTouchRipple
        size="small"
        variant="text"
        sx={{
          position: "absolute",
          top: theme.spacing(0.25),
          right: theme.spacing(0.25),
          bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.6),
          ["&:hover"]: {
            bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.6),
          },
          [stylesColorScheme.light]: {
            color: theme.vars.palette.common.white,
          },
        }}
      >
        <NimbusDragDotsIcon />
      </IconButton>

      <Box component={LazyLoadImage} src={src} sx={{ objectFit: "cover", aspectRatio: "1" }} />
    </Box>
  );
};

// ----------------------------------------------------------------------

const CutViewerFn = () => {};

export const Editor = Object.assign(EditorFn);
