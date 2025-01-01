"use client";

import { forwardRef } from "react";
import { Box, BoxProps, Grid, GridProps, IconButton, IconButtonProps, useTheme } from "@mui/material";
import Autoplay from "embla-carousel-autoplay";
import { LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";
import { useCombinedRefs } from "@pency/util";
import { stylesColorScheme, varAlpha } from "../../../util";
import { EvaArrowIosBackFillIcon, EvaArrowIosForwardFillIcon } from "../../svg";
import { CarouselProvider, useAction, useData } from "../model";

// ----------------------------------------------------------------------

const BannerCarouselFn = ({ children }: { children?: React.ReactNode }) => {
  return (
    <CarouselProvider options={{ loop: true }} plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}>
      {children}
    </CarouselProvider>
  );
};

// ----------------------------------------------------------------------

type PanelFnProps = {
  slots: {
    prevNav?: React.ReactElement | null;
    nextNav?: React.ReactElement | null;
  };
} & React.PropsWithoutRef<BoxProps>;

const PanelFn = forwardRef<HTMLDivElement, PanelFnProps>(({ slots, children, ...rest }, ref) => {
  const { emblaRef } = useData("BannerCarousel");
  const refs = useCombinedRefs(emblaRef, ref);

  return (
    <Box ref={refs} {...rest} sx={{ position: "relative", ...rest.sx }}>
      <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
        <Grid container sx={{ flexWrap: "nowrap" }}>
          {children}
        </Grid>
      </Box>
      {slots.prevNav}
      {slots.nextNav}
    </Box>
  );
});

// ----------------------------------------------------------------------

type SlideFnProps = GridProps;

const SlideFn = forwardRef<HTMLDivElement, SlideFnProps>(({ children, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <Grid
      item
      ref={ref}
      xs={12}
      sm={8}
      md={6}
      lg={6}
      {...rest}
      sx={{
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ml: theme.spacing(1.5),
        borderRadius: theme.spacing(2),
        overflow: "hidden",
        ...rest.sx,
      }}
    >
      {children}
    </Grid>
  );
});

type ImageFnProps = Omit<BoxProps & LazyLoadImageProps, "children">;

const ImageFn = forwardRef<HTMLImageElement, ImageFnProps>((rest, ref) => {
  return <Box ref={ref} component={LazyLoadImage} {...rest} sx={{ width: 1, objectFit: "cover", ...rest.sx }} />;
});

// ----------------------------------------------------------------------

type PrevNavFnProps = IconButtonProps;

const PrevNavFn = forwardRef<HTMLButtonElement, PrevNavFnProps>((rest, ref) => {
  const { onPrevNavClick } = useAction("BannerCarousel");
  const theme = useTheme();
  return (
    <>
      <IconButton
        ref={ref}
        variant="text"
        onClick={onPrevNavClick}
        {...rest}
        sx={{
          position: "absolute",
          top: "calc(50% - 18px)",
          left: "9px",
          bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.6),
          ["&:hover"]: {
            bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.8),
          },
          [stylesColorScheme.light]: {
            color: theme.vars.palette.common.white,
          },
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
          ...rest.sx,
        }}
      >
        <EvaArrowIosBackFillIcon />
      </IconButton>
    </>
  );
});

// ----------------------------------------------------------------------

type NextNavFnProps = IconButtonProps;

const NextNavFn = forwardRef<HTMLButtonElement, NextNavFnProps>((rest, ref) => {
  const { onNextNavClick } = useAction("BannerCarousel");
  const theme = useTheme();

  return (
    <IconButton
      ref={ref}
      variant="text"
      onClick={onNextNavClick}
      {...rest}
      sx={{
        position: "absolute",
        top: "calc(50% - 18px)",
        right: "9px",
        bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.6),
        ["&:hover"]: {
          bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.8),
        },
        [stylesColorScheme.light]: {
          color: theme.vars.palette.common.white,
        },
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
        ...rest.sx,
      }}
    >
      <EvaArrowIosForwardFillIcon />
    </IconButton>
  );
});

// ----------------------------------------------------------------------

export const BannerCarousel = Object.assign(BannerCarouselFn, {
  Panel: PanelFn,
  Slide: Object.assign(SlideFn, {
    Image: ImageFn,
  }),
  PrevNav: PrevNavFn,
  NextNav: NextNavFn,
});
