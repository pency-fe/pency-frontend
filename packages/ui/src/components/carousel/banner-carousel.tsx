"use client";

import { ReactElement, createContext, forwardRef, useContext } from "react";
import { Box, BoxProps, Grid, GridProps, IconButton, IconButtonProps, useTheme } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";
import { EvaArrowIosBackFillIcon, EvaArrowIosForwardFillIcon } from "../svg";
import { stylesColorScheme, varAlpha } from "../../util";
import { useEmblaPrevNextNav } from "./use-embla-prev-next-nav";

// ----------------------------------------------------------------------

const BannerCarouselActionsContext = createContext<
  Omit<ReturnType<typeof useEmblaPrevNextNav>, "prevNavDisabled" | "nextNavDisabled"> | undefined
>(undefined);

function useActions(component: string) {
  const context = useContext(BannerCarouselActionsContext);

  if (!context) throw new Error(`<${component} />의 부모로 <BannerCarousel /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

type BannerCarouselFnProps = {
  slots: {
    slides: ReactElement;
    prevNav?: ReactElement | null;
    nextNav?: ReactElement | null;
  };
} & BoxProps;

const BannerCarouselFn = forwardRef<HTMLDivElement, BannerCarouselFnProps>(({ slots, ...rest }, ref) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);
  const { onPrevNavClick, onNextNavClick } = useEmblaPrevNextNav(emblaApi);

  return (
    <BannerCarouselActionsContext.Provider value={{ onPrevNavClick, onNextNavClick }}>
      <Box ref={ref} {...rest} sx={{ position: "relative", ...rest.sx }}>
        <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
          <Grid container sx={{ flexWrap: "nowrap" }}>
            {slots.slides}
          </Grid>
        </Box>
        {slots.prevNav}
        {slots.nextNav}
      </Box>
    </BannerCarouselActionsContext.Provider>
  );
});

// ----------------------------------------------------------------------

type SlideFnProps = {
  slots: {
    image: ReactElement;
  };
} & GridProps;

const SlideFn = forwardRef<HTMLDivElement, SlideFnProps>(({ slots, ...rest }, ref) => {
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
      {slots.image}
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
  const theme = useTheme();
  const { onPrevNavClick } = useActions("BannerCarousel.PrevNav");
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
  const theme = useTheme();
  const { onNextNavClick } = useActions("BannerCarousel.NextNav");
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
  Slide: Object.assign(SlideFn, {
    Image: ImageFn,
  }),
  PrevNav: PrevNavFn,
  NextNav: NextNavFn,
});
