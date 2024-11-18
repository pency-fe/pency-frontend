"use client";

import { DraggableSyntheticListeners } from "@dnd-kit/core";
import {
  Box,
  BoxProps,
  IconButton,
  IconButtonProps,
  Skeleton,
  Stack,
  StackProps,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import { Label, NimbusDragDotsIcon } from "@pency/ui/components";
import { maxLine, stylesColorScheme, varAlpha } from "@pency/ui/util";
import { useBooleanState } from "@pency/util";
import { forwardRef, PropsWithoutRef, useEffect, useRef } from "react";

// ----------------------------------------------------------------------

type CutFnProps = {
  slots: {
    image: React.ReactElement;
    description?: React.ReactElement | null;
  };
} & StackProps;

const CutFn = ({ slots, ...rest }: CutFnProps) => {
  return (
    <Stack {...rest} sx={{ gap: 1, padding: "5px", ...rest.sx }}>
      {slots.image}
      {slots.description}
    </Stack>
  );
};

// ----------------------------------------------------------------------

type ImageFnProps = { src: string; slots?: { dragDot?: React.ReactElement } } & BoxProps;

const ImageFn = ({ src, slots, ...rest }: ImageFnProps) => {
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
      {!loading.bool && slots?.dragDot}
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

// ----------------------------------------------------------------------

type DragDotFnProps = {
  listeners?: DraggableSyntheticListeners;
} & IconButtonProps;

const DragDotFn = ({ listeners, ...rest }: DragDotFnProps) => {
  const theme = useTheme();

  return (
    <IconButton
      tabIndex={-1}
      disableRipple
      disableFocusRipple
      disableTouchRipple
      size="small"
      variant="text"
      {...rest}
      {...listeners}
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
        ...rest.sx,
      }}
    >
      <NimbusDragDotsIcon />
    </IconButton>
  );
};

// ----------------------------------------------------------------------

type DescriptionFnProps = { order: number; name: string } & TypographyProps;

const DescriptionFn = ({ order, name, ...rest }: DescriptionFnProps) => {
  return (
    <Typography
      variant="overline"
      {...rest}
      sx={[maxLine({ line: 2 }), ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])]}
    >
      <Label variant="soft" color="info" sx={{ mr: 0.5 }}>
        {order}
      </Label>
      {name}
    </Typography>
  );
};

// ----------------------------------------------------------------------

type PaidBoundaryCutFnProps = { slots: { dragDot: React.ReactElement } } & PropsWithoutRef<BoxProps>;

const PaidBoundaryCutFn = forwardRef<HTMLDivElement, PaidBoundaryCutFnProps>(({ slots, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <Box ref={ref} {...rest} sx={{ padding: "5px", ...rest.sx }}>
      <Box
        sx={{
          position: "relative",
          width: 1,
          pt: "100%",
          borderRadius: 1,
          bgcolor: theme.vars.palette.grey["900"],
        }}
      >
        {slots.dragDot}
        <Label
          variant="soft"
          color="primary"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            [theme.breakpoints.down("sm")]: { bgcolor: "transparent", fontSize: "0.7rem" },
          }}
        >
          여기부터 유료
        </Label>
      </Box>
    </Box>
  );
});

// ----------------------------------------------------------------------

export const Cut = Object.assign(CutFn, {
  Image: Object.assign(ImageFn, { DragDot: DragDotFn }),
  Description: DescriptionFn,
});

export const PaidBoundaryCut = Object.assign(PaidBoundaryCutFn, {
  DragDot: DragDotFn,
});
