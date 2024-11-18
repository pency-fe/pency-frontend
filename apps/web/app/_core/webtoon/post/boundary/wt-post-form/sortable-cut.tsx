"use client";

import { CSS } from "@dnd-kit/utilities";
import { Box, ButtonBase, useTheme } from "@mui/material";
import { Cut } from "./cut";
import { useSortable } from "@dnd-kit/sortable";
import { useActiveCutRefContext } from "./sortable-cut-manager";
import { MouseEventHandler, useRef } from "react";
import { useCombinedRefs } from "@pency/util";

type Listeners = {
  onMouseDown: (event: MouseEvent) => void;
  onTouchStart: (event: TouchEvent) => void;
};

type SortableCutProps = { src: string };

export const SortableCut = ({ src }: SortableCutProps) => {
  const methods = useSortable({
    id: src,
  });
  const { attributes, setNodeRef, transform, transition, isDragging } = methods;
  const listeners = methods.listeners as Listeners;

  const ref = useRef<HTMLDivElement>(null);
  const refs = useCombinedRefs(setNodeRef, ref);

  const { activeCutRef, toggleActiveCutRef } = useActiveCutRefContext((state) => state);

  const theme = useTheme();

  const handleClick: MouseEventHandler = () => {
    toggleActiveCutRef(ref);
  };

  return (
    <Box
      ref={refs}
      {...attributes}
      tabIndex={-1}
      sx={{
        position: "relative",
        borderRadius: 1,
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <ButtonBase
        tabIndex={-1}
        onClick={handleClick}
        sx={{
          position: "absolute",
          inset: 0,
          ...(activeCutRef === ref && {
            borderRadius: 1,
            outlineWidth: "2px",
            outlineOffset: "2px",
            outlineStyle: "solid",
            outlineColor: theme.vars.palette.primary.main,
          }),
          zIndex: 1,
        }}
      />
      <Cut
        src={src}
        listeners={listeners}
        sx={{
          opacity: isDragging ? 0.24 : 1,
        }}
      />
    </Box>
  );
};
