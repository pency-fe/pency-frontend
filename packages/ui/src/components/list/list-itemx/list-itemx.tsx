"use client";

import { iconAlignCenter, maxLine, varAlpha } from "@/util";
import { Box, BoxProps, ButtonBase, ButtonBaseProps, Typography, TypographyProps, useTheme } from "@mui/material";
import { forwardRef, ReactElement } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";
import { Label } from "../../label";
import { listItemxClasses } from "./list-itemx-classes";
import { BrandPencyTextIcon } from "@/components/svg";

// ----------------------------------------------------------------------

type ListItemxFnProps = {
  slots: {
    overlayElement: ReactElement;
    trailingLabel?: ReactElement;
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
      className={listItemxClasses.root}
      ref={ref}
      {...rest}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 1,
        width: 1,
        height: "60px",
        padding: "4px",
        borderRadius: 1,
        "&:hover": {
          bgcolor: theme.vars.palette.action.hover,
        },
        ...rest.sx,
      }}
    >
      {slots.overlayElement}

      {slots.trailingLabel}

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

type TrailingLabelFnProps = TypographyProps;

const TrailingLabelFn = forwardRef<HTMLSpanElement, TrailingLabelFnProps>((rest, ref) => {
  return (
    <Typography
      ref={ref}
      variant="body2"
      color="inherit"
      {...rest}
      sx={[maxLine({ line: 1 }), ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])]}
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

type ImageFnProps = Omit<BoxProps<"img", LazyLoadImageProps>, "children" | "src"> & { src?: string | null };

const ImageFn = forwardRef<HTMLImageElement, ImageFnProps>(({ src, ...rest }, ref) => {
  const theme = useTheme();
  return (
    <>
      {src ? (
        <Box
          ref={ref}
          src={src}
          component={LazyLoadImage}
          {...rest}
          sx={{
            width: 1,
            objectFit: "cover",
            ...rest.sx,
          }}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 1,
            height: 1,
            bgcolor: varAlpha(theme.vars.palette.grey["500Channel"], 0.16),
          }}
        >
          <BrandPencyTextIcon sx={{ width: "50%" }} />
        </Box>
      )}
    </>
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
  TrailingLabel: TrailingLabelFn,
  Thumbnail: Object.assign(ThumbnailFn, { Image: ImageFn }),
  Order: Label,
  Title: TitleFn,
  Attribute: Object.assign(AttributeFn, { Dot: DotFn }),
});
