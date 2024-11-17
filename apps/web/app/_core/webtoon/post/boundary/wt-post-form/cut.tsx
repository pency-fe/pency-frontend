import { DraggableSyntheticListeners } from "@dnd-kit/core";
import { Box, BoxProps, IconButton, Skeleton, useTheme } from "@mui/material";
import { NimbusDragDotsIcon } from "@pency/ui/components";
import { stylesColorScheme, varAlpha } from "@pency/ui/util";
import { useBooleanState } from "@pency/util";
import { useEffect, useRef } from "react";

type CutProps = {
  src: string;
  listeners?: DraggableSyntheticListeners;
} & BoxProps;

export const Cut = ({ src, listeners, ...rest }: CutProps) => {
  const theme = useTheme();
  const loading = useBooleanState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete && loading) {
      loading.setFalse();
    }
  });

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
        ...rest.sx,
      }}
    >
      {loading.bool && <Skeleton animation="wave" variant="rectangular" sx={{ width: 1, pt: "100%" }} />}
      {!loading.bool && (
        <>
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
              zIndex: 2,
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
        </>
      )}
      <Box
        ref={imageRef}
        component="img"
        src={src}
        onLoad={loading.setFalse}
        sx={{ objectFit: "cover", aspectRatio: "1" }}
      />
    </Box>
  );
};
