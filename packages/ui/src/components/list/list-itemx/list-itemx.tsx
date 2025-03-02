"use client";

import {
  Box,
  BoxProps,
  ButtonBase,
  ButtonBaseProps,
  Stack,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import { forwardRef, ReactElement } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";
import { Label } from "../../label";
import { listItemxClasses } from "./list-itemx-classes";
import { iconAlignCenter, maxLine } from "../../../util";

// ----------------------------------------------------------------------

type ListItemxFnProps = {
  slots: {
    overlayElement: ReactElement;
    leadingLabel?: ReactElement | null;
    thumbnail: ReactElement;
    order?: ReactElement | null;
    labels?: ReactElement | null;
    title: ReactElement;
    attribute?: ReactElement | null;
    trailing?: ReactElement | null;
    undereye?: ReactElement | null;
  };
} & BoxProps;

const ListItemxFn = forwardRef<HTMLDivElement, ListItemxFnProps>(({ slots, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <Stack spacing={1}>
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
          height: slots.labels ? theme.spacing(10) : theme.spacing(8),
          padding: "4px",
          borderRadius: 1,
          overflow: "hidden",
          "&:hover": {
            bgcolor: theme.vars.palette.action.hover,
          },
          ...rest.sx,
        }}
      >
        {slots.overlayElement}

        {slots.leadingLabel}

        {slots.thumbnail}

        {slots.order}

        <Stack spacing={0.25}>
          <Box>{slots.labels}</Box>
          {slots.title}
          {slots.attribute}
        </Stack>

        <Box sx={{ ml: "auto" }}>{slots.trailing}</Box>
      </Box>
      {slots.undereye}
    </Stack>
  );
});

// ----------------------------------------------------------------------

type OverlayButtonFnProps = ButtonBaseProps<"button">;

const OverlayButtonFn = forwardRef<HTMLButtonElement, OverlayButtonFnProps>((rest, ref) => {
  return (
    <ButtonBase
      ref={ref}
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

type LeadingLabelFnProps = TypographyProps;

const LeadingLabelFn = forwardRef<HTMLSpanElement, LeadingLabelFnProps>((rest, ref) => {
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
  return (
    <Box
      ref={ref}
      src={src ?? process.env["NEXT_PUBLIC_TEXT_LOGO"]}
      component={LazyLoadImage}
      {...rest}
      sx={{
        width: 1,
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

type TrailingFnProps = BoxProps & { children: ReactElement };

const TrailingFn = forwardRef<HTMLDivElement, TrailingFnProps>(({ children, ...rest }, ref) => {
  return (
    <Box ref={ref} {...rest} sx={{ position: "relative", zIndex: 2, ...rest.sx }}>
      {children}
    </Box>
  );
});

// ----------------------------------------------------------------------

type UnderEyeFnProps = TypographyProps;

const UnderEyeFn = forwardRef<HTMLHeadingElement, UnderEyeFnProps>((rest, ref) => {
  const theme = useTheme();

  return (
    <Typography
      ref={ref}
      variant="body2"
      color={theme.vars.palette.text.secondary}
      {...rest}
      sx={[maxLine({ line: 1 }), ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx])]}
    />
  );
});

// ----------------------------------------------------------------------

export const ListItemx = Object.assign(ListItemxFn, {
  OverlayAnchor: OverlayAnchorFn,
  OverlayButton: OverlayButtonFn,
  LeadingLabel: LeadingLabelFn,
  Thumbnail: Object.assign(ThumbnailFn, { Image: ImageFn }),
  Order: Label,
  Labels: Label,
  Title: TitleFn,
  Attribute: Object.assign(AttributeFn, { Dot: DotFn }),
  Trailing: Object.assign(TrailingFn),
  UnderEye: UnderEyeFn,
});
