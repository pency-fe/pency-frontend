"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DraggableSyntheticListeners,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { Box, IconButton, Portal, Stack, SxProps } from "@mui/material";
import { ListItemx, NimbusDragDotsIcon } from "@pency/ui/components";
import { usePathname } from "next/navigation";
import { memo, useMemo, useState } from "react";
import { FormProvider, useController, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  series: z.array(
    z.object({
      id: z.number(),
      image: z.string().nullable(),
      title: z.string(),
      postCount: z.number(),
    }),
  ),
});

type Schema = z.infer<typeof schema>;

type Series = {
  id: number;
  image: string | null;
  title: string;
  postCount: number;
};

type WtSeriesOrderFormFnProps = {
  series: Series[];
  children?: React.ReactNode;
};

const WtSeriesOrderFormFn = ({ series, children }: WtSeriesOrderFormFnProps) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      series,
    },
    mode: "onChange",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

// ----------------------------------------------------------------------

const SubmitButtonFn = (rest: LoadingButtonProps) => {
  const {
    formState: { isDirty },
    handleSubmit,
  } = useFormContext<Schema>();

  // handleSubmit, 데이터 불러오기. loading, 없으면 ui제거

  return (
    <LoadingButton disabled={!isDirty} variant="contained" color="primary" {...rest}>
      시리즈 순서 저장
    </LoadingButton>
  );
};

// ----------------------------------------------------------------------

const EditorFn = () => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const { control } = useFormContext<Schema>();
  const {
    field: { value, onChange },
  } = useController({ control, name: "series" });

  const [draggedSeries, setDraggedSeries] = useState<Series | null>(null);

  const items = useMemo(() => value.map(({ id }) => id), [value]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setDraggedSeries(value.find(({ id }) => id === active.id) ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setDraggedSeries(null);

    if (over && active.id !== over.id) {
      const oldIndex = value.findIndex(({ id }) => id === active.id);
      const newIndex = value.findIndex(({ id }) => id === over.id);

      onChange(arrayMove(value, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      id="dnd-manager"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <Stack gap={0.5}>
          {value.map(({ id, image, title, postCount }) => (
            <SortableSeriesItem key={id} id={id} image={image} title={title} postCount={postCount} />
          ))}
        </Stack>
      </SortableContext>
      <Portal>
        <DragOverlay>{draggedSeries ? <SeriesItem {...draggedSeries} /> : null}</DragOverlay>
      </Portal>
    </DndContext>
  );
};

// ----------------------------------------------------------------------

type SortableSeriesItemProps = Series;

const SortableSeriesItem = (rest: SortableSeriesItemProps) => {
  const { attributes, setNodeRef, transform, transition, isDragging, listeners } = useSortable({
    id: rest.id,
  });

  const sx: SxProps = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.24 : 1,
    }),
    [transform, isDragging],
  );

  return (
    <Box ref={setNodeRef} {...attributes} tabIndex={-1} sx={sx}>
      <SeriesItem listeners={listeners} {...rest} />
    </Box>
  );
};

// ----------------------------------------------------------------------

type SeriesItemProps = { listeners?: DraggableSyntheticListeners } & Series;

const SeriesItem = memo(({ id, image, title, postCount, listeners }: SeriesItemProps) => {
  const pathname = usePathname();

  return (
    <ListItemx
      slots={{
        overlayElement: <ListItemx.OverlayAnchor href={`${pathname}/edit/${id}`} />,
        thumbnail: (
          <ListItemx.Thumbnail
            slots={{ image: <ListItemx.Thumbnail.Image src={image} /> }}
            sx={{ aspectRatio: "16/9" }}
          />
        ),
        title: <ListItemx.Title>{title}</ListItemx.Title>,
        attribute: <ListItemx.Attribute>포스트 {postCount}개</ListItemx.Attribute>,
        trailing: (
          <ListItemx.Trailing>
            <IconButton tabIndex={-1} disableRipple disableFocusRipple disableTouchRipple {...listeners}>
              <NimbusDragDotsIcon />
            </IconButton>
          </ListItemx.Trailing>
        ),
      }}
    />
  );
});

// ----------------------------------------------------------------------

export const WtSeriesOrderForm = Object.assign(WtSeriesOrderFormFn, {
  Editor: EditorFn,
  SubmitButton: SubmitButtonFn,
});
