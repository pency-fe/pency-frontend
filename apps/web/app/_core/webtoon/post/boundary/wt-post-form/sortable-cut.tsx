import { CSS } from "@dnd-kit/utilities";
import { Box, ButtonBase, useTheme } from "@mui/material";
import { Cut } from "./cut";
import { useSortable } from "@dnd-kit/sortable";
import { useActiveCutContext } from "./sortable-cut-manager";
import { KeyboardEventHandler, MouseEventHandler, useCallback } from "react";

type SortableCutProps = { src: string };

export const SortableCut = ({ src }: SortableCutProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: src,
  });
  const { activeCut, handleActiveCut } = useActiveCutContext((state) => state);
  const theme = useTheme();

  const handleClick: MouseEventHandler = useCallback(() => {
    handleActiveCut(src);
  }, [handleActiveCut, src]);

  const handleKeyDown: KeyboardEventHandler = useCallback(
    (e) => {
      if (activeCut) {
        listeners?.onKeyDown?.(e);
      }
    },
    [listeners, activeCut, handleActiveCut],
  );

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
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
          ...(activeCut === src && {
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
