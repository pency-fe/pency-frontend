"use client";

import { CSS } from "@dnd-kit/utilities";
import { Box, ButtonBase, useTheme } from "@mui/material";
import { Cut, PaidBoundaryCut } from "./cut";
import { useSortable } from "@dnd-kit/sortable";
import { useActiveCutsContext } from "./sortable-cut-manager";
import { MouseEventHandler, useRef } from "react";
import { useCombinedRefs } from "@pency/util";

type Listeners = {
  onMouseDown: (event: MouseEvent) => void;
  onTouchStart: (event: TouchEvent) => void;
};

type SortableCutProps = { src: string; name: string; order: number };

export const SortableCut = ({ src, name, order }: SortableCutProps) => {
  const methods = useSortable({
    id: src,
  });
  const { attributes, setNodeRef, transform, transition, isDragging } = methods;
  const listeners = methods.listeners as Listeners;

  const ref = useRef<HTMLDivElement>(null);
  const refs = useCombinedRefs(setNodeRef, ref);

  const { activeCuts, toggleActiveCut } = useActiveCutsContext((state) => state);

  const theme = useTheme();

  const handleClick: MouseEventHandler = () => {
    toggleActiveCut(src);
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
        overflow: "hidden",
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
          zIndex: 1,
        }}
      />
      <Cut
        slots={{
          image: (
            <Box
              sx={{
                ...(activeCuts.has(src) && {
                  borderRadius: 1,
                  outlineWidth: "2px",
                  outlineOffset: "2px",
                  outlineStyle: "solid",
                  outlineColor: theme.vars.palette.primary.main,
                }),
              }}
            >
              <Cut.Image
                src={src}
                slots={{
                  dragDot: <Cut.Image.DragDot listeners={listeners} />,
                }}
              />
            </Box>
          ),
          description: <Cut.Description order={order} name={name} />,
        }}
        sx={{
          opacity: isDragging ? 0.24 : 1,
        }}
      />
    </Box>
  );
};

// ----------------------------------------------------------------------

export const SortablePaidBoundaryCut = () => {
  const methods = useSortable({
    id: "paid-boundary-cut",
  });

  const { attributes, setNodeRef, transform, transition, isDragging } = methods;
  const listeners = methods.listeners as Listeners;

  return (
    <PaidBoundaryCut
      ref={setNodeRef}
      {...attributes}
      slots={{ dragDot: <PaidBoundaryCut.DragDot listeners={listeners} /> }}
      sx={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.24 : 1 }}
    />
  );
};
