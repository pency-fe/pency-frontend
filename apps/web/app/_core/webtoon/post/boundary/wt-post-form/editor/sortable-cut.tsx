"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, ButtonBase, SxProps } from "@mui/material";
import { memo, useCallback, useMemo } from "react";
import { Cut, DividerCut } from "./cut";
import { useActiveCutIdsContext } from "./sortable-manager";

type SortableCutProps = { src: string; name: string; order: number };

export const SortableCut = ({ src, name, order }: SortableCutProps) => {
  const { attributes, setNodeRef, transform, transition, isDragging, listeners } = useSortable({
    id: src,
  });
  const { activeCutIds, toggleActiveCutId } = useActiveCutIdsContext((state) => state);

  const handleClick = useCallback(() => {
    toggleActiveCutId(src);
  }, [toggleActiveCutId, src]);

  const sx: SxProps = useMemo(
    () => ({
      position: "relative",
      borderRadius: 1,
      cursor: "pointer",
      overflow: "hidden",
      WebkitTapHighlightColor: "transparent",
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.24 : 1,
    }),
    [transform, isDragging],
  );

  return (
    <Box ref={setNodeRef} {...attributes} tabIndex={-1} sx={sx}>
      <SortableCutButton handleClick={handleClick} />
      <Cut src={src} name={name} order={order} listeners={listeners} active={activeCutIds.has(src)} />
    </Box>
  );
};

const SortableCutButton = memo(({ handleClick }: { handleClick: () => void }) => {
  return (
    <ButtonBase
      tabIndex={-1}
      onClick={handleClick}
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
      }}
    />
  );
});

// ----------------------------------------------------------------------

export const DIVIDER_CUT_ID = "divider-cut";

export const SortableDividerCut = () => {
  const { attributes, setNodeRef, transform, transition, isDragging, listeners } = useSortable({
    id: DIVIDER_CUT_ID,
  });

  const sx: SxProps = useMemo(
    () => ({ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.24 : 1 }),
    [transform, isDragging],
  );

  return (
    <Box ref={setNodeRef} {...attributes} tabIndex={-1} sx={sx}>
      <DividerCut listeners={listeners} />
    </Box>
  );
};
