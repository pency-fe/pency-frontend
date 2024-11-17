"use client";

import { iconAlignCenter, maxLine } from "@/util";
import { Box, BoxProps, ButtonBase, ButtonBaseProps, Typography, TypographyProps, useTheme } from "@mui/material";
import { forwardRef, ReactElement } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";
import { Label } from "../label";

// ----------------------------------------------------------------------

type ListItemxFnProps = {
  slots: {
    overlayElement: ReactElement;
    thumbnail: ReactElement;
    order?: ReactElement | null;
    title: ReactElement;
    attribute?: ReactElement | null;
  };
} & BoxProps;

const ListItemxFn = forwardRef<HTMLDivElement, ListItemxFnProps>(({ slots, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <Box
      ref={ref}
      {...rest}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        width: 1,
        height: "60px",
        padding: "4px",
        borderRadius: 1,
        "&:hover": {
          bgColor: theme.vars.palette.action.hover,
        },
        ...rest.sx,
      }}
    >
      {slots.overlayElement}

      {slots.thumbnail}

      {slots.order}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
        {slots.title}
        {slots.attribute}
      </Box>
    </Box>
  );
});

// ----------------------------------------------------------------------

type OverlayButtonFnProps = ButtonBaseProps<"button">;

const OverlayButtonFn = forwardRef<HTMLButtonElement, OverlayButtonFnProps>((rest, ref) => {
  return (
    <ButtonBase
      ref={ref}
      disableRipple
      {...ref}
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        ...rest.sx,
      }}
    />
  );
});

type OverlayAnchorFnProps = ButtonBaseProps<"a"> & NextLinkProps;

const OverlayAnchorFn = forwardRef<HTMLAnchorElement, OverlayAnchorFnProps>((rest, ref) => {
  return (
    <ButtonBase
      ref={ref}
      LinkComponent={NextLink}
      disableRipple
      {...rest}
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        ...rest.sx,
      }}
    />
  );
});

// ----------------------------------------------------------------------

type ThumbnailFnProps = Omit<
  {
    slots: {
      image: ReactElement;
      topEnd?: ReactElement | null;
    };
  } & BoxProps,
  "children"
>;

const ThumbnailFn = forwardRef<HTMLDivElement, ThumbnailFnProps>(({ slots, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <Box
      ref={ref}
      {...rest}
      sx={{
        flexShrink: 0,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 1,
        borderRadius: 1,
        overflow: "hidden",
        ...rest.sx,
      }}
    >
      {slots.image}

      {slots.topEnd && (
        <Box
          sx={{
            position: "absolute",
            top: theme.spacing(0.25),
            right: theme.spacing(0.25),
            "& svg": {
              fontSize: "1rem",
            },
          }}
        >
          {slots.topEnd}
        </Box>
      )}
    </Box>
  );
});

type ImageFnProps = Omit<BoxProps & LazyLoadImageProps, "children">;

const ImageFn = forwardRef<HTMLImageElement, ImageFnProps>((rest, ref) => {
  return (
    <Box
      ref={ref}
      component={LazyLoadImage}
      {...rest}
      sx={{
        height: 1,
        objectFit: "cover",
        ...rest.sx,
      }}
    />
  );
});

// ----------------------------------------------------------------------

type TitleFnProps = TypographyProps;

const TitleFn = forwardRef<HTMLHeadingElement, TitleFnProps>((rest, ref) => {
  return (
    <Typography
      ref={ref}
      variant="subtitle2"
      color="inherit"
      {...rest}
      sx={[maxLine({ line: 1 }), ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])]}
    />
  );
});

// ----------------------------------------------------------------------

type AttributeFnProps = TypographyProps;

const AttributeFn = forwardRef<HTMLSpanElement, AttributeFnProps>((rest, ref) => {
  const theme = useTheme();

  return (
    <Typography
      ref={ref}
      component="span"
      variant="overline"
      {...rest}
      sx={[
        {
          color: theme.vars.palette.text.secondary,
          lineHeight: 1,
          "& svg": {
            mr: theme.spacing(0.25),
            ...iconAlignCenter,
          },
          ...maxLine({ line: 1 }),
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    />
  );
});

type DotFnProps = TypographyProps;

const DotFn = forwardRef<HTMLSpanElement, DotFnProps>((rest, ref) => {
  const theme = useTheme();

  return (
    <Typography
      component="span"
      variant="inherit"
      ref={ref}
      {...rest}
      sx={{ lineHeight: 1, mx: theme.spacing(0.5), ...rest.sx }}
    >
      •
    </Typography>
  );
});

// ----------------------------------------------------------------------

export const ListItemx = Object.assign(ListItemxFn, {
  OverlayAnchor: OverlayAnchorFn,
  OverlayButton: OverlayButtonFn,
  Thumbnail: Object.assign(ThumbnailFn, { Image: ImageFn }),
  Order: Label,
  Title: TitleFn,
  Attribute: Object.assign(AttributeFn, { Dot: DotFn }),
});
