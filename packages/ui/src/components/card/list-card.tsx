"use client";

import { iconAlignCenter, maxLine } from "@/util";
import {
  Box,
  BoxProps,
  ButtonBase,
  ButtonBaseProps,
  Card,
  CardProps,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import { useBooleanState } from "@pency/util";
import { forwardRef, ReactElement } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";
import { Label } from "../label";

// ----------------------------------------------------------------------

type ListCardFnProps = {
  slots: {
    overlayElement: ReactElement;
    thumbnail: ReactElement;
    rank: ReactElement;
    title: ReactElement;
    name: ReactElement;
    attributes?: ReactElement | null;
  };
} & CardProps;

const ListCardFn = forwardRef<HTMLDivElement, ListCardFnProps>(({ slots, ...rest }, ref) => {
  const theme = useTheme();
  const { bool: hover, setTrue: setHoverTrue, setFalse: setHoverFalse } = useBooleanState(false);

  return (
    <Card
      ref={ref}
      {...rest}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        backgroundColor: "transparent",
        width: 1,
        boxShadow: "none",
        borderRadius: 0,
        ...(hover && {
          backgroundColor: theme.vars.palette.action.hover,
          borderRadius: 2,
        }),
        ...rest.sx,
      }}
      onMouseEnter={setHoverTrue}
      onMouseLeave={setHoverFalse}
    >
      {slots.overlayElement}

      {slots.thumbnail}

      {slots.rank}
      <Box sx={{ px: 0.5, py: 1.5 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>{slots.title}</Box>
          <Typography
            variant="overline"
            sx={{
              display: "flex",
              color: theme.vars.palette.text.secondary,
              lineHeight: 1,
              "& svg": {
                mr: theme.spacing(0.25),
                ...iconAlignCenter,
              },
            }}
          >
            {slots.name}
            {slots.attributes}
          </Typography>
        </Box>
      </Box>
    </Card>
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
      topEnds?: ReactElement | null;
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
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 320,
        borderRadius: 2,
        overflow: "hidden",
        ...rest.sx,
      }}
    >
      {slots.image}

      {slots.topEnds && (
        <Box
          sx={{
            position: "absolute",
            top: theme.spacing(0.75),
            right: theme.spacing(0.75),
            display: "flex",
            gap: theme.spacing(0.5),
          }}
        >
          {slots.topEnds}
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

type NameFnProps = TypographyProps;

const NameFn = forwardRef<HTMLAnchorElement, NameFnProps>((rest, ref) => {
  return (
    <Typography
      ref={ref}
      variant="inherit"
      color="inherit"
      {...rest}
      sx={{
        ...rest.sx,
      }}
    />
  );
});

// ----------------------------------------------------------------------

type AttributeFnProps = TypographyProps;

const AttributeFn = forwardRef<HTMLSpanElement, AttributeFnProps>((rest, ref) => {
  return (
    <Typography
      component="span"
      ref={ref}
      {...rest}
      variant="inherit"
      sx={{
        lineHeight: 1,
        ...rest.sx,
      }}
    />
  );
});

type DotFnProps = TypographyProps;

const AttributeDotFn = forwardRef<HTMLSpanElement, DotFnProps>((rest, ref) => {
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

export const ListCard = Object.assign(ListCardFn, {
  OverlayAnchor: OverlayAnchorFn,
  OverlayButton: OverlayButtonFn,
  Thumbnail: Object.assign(ThumbnailFn, { Image: ImageFn }),
  Rank: Label,
  Title: TitleFn,
  Name: NameFn,
  Attribute: AttributeFn,
  AttributeDot: AttributeDotFn,
});
