"use client";

import { forwardRef } from "react";
import { Box, BoxProps, Grid, GridProps, IconButton, IconButtonProps, useTheme } from "@mui/material";
import { useCombinedRefs } from "@pency/util";
import { EvaArrowIosBackFillIcon, EvaArrowIosForwardFillIcon } from "../../svg";
import { noneUserSelect } from "../../../util";
import { carouselMediaQueries, CarouselProvider, useAction, useData } from "../model";

// ----------------------------------------------------------------------

const OverviewCardCarouselFn = ({ children }: { children?: React.ReactNode }) => {
  return (
    <CarouselProvider
      options={{
        align: "start",
        breakpoints: {
          [carouselMediaQueries.upXs]: {
            slidesToScroll: 1,
          },
          [carouselMediaQueries.upSm]: {
            slidesToScroll: 2,
          },
          [carouselMediaQueries.upMd]: {
            slidesToScroll: 3,
          },
          [carouselMediaQueries.upLg]: {
            slidesToScroll: 4,
          },
        },
      }}
    >
      {children}
    </CarouselProvider>
  );
};

// ----------------------------------------------------------------------

const PanelFn = forwardRef<HTMLDivElement, React.PropsWithoutRef<BoxProps>>(({ children, ...rest }, ref) => {
  const { emblaRef } = useData("OverviewCardCarousel");
  const refs = useCombinedRefs(emblaRef, ref);
  return (
    <Box ref={refs} {...rest} sx={{ overflow: "hidden", ...rest.sx }}>
      <Grid container spacing={1.5} sx={{ flexWrap: "nowrap" }}>
        {children}
      </Grid>
    </Box>
  );
});

// ----------------------------------------------------------------------

const SlideFn = forwardRef<HTMLDivElement, React.PropsWithoutRef<GridProps>>(({ children, ...rest }, ref) => {
  return (
    <Grid item ref={ref} xs={11} sm={6} md={4} lg={3} {...rest} sx={{ flexShrink: 0, ...noneUserSelect, ...rest.sx }}>
      {children}
    </Grid>
  );
});

// ----------------------------------------------------------------------

const PrevNavFn = forwardRef<HTMLButtonElement, React.PropsWithoutRef<IconButtonProps>>((rest, ref) => {
  const { prevNavDisabled } = useData("OverviewCardCarousel");
  const { onPrevNavClick } = useAction("OverviewCardCarousel");
  const theme = useTheme();

  return (
    <IconButton
      ref={ref}
      variant="outlined"
      disabled={prevNavDisabled}
      onClick={onPrevNavClick}
      size="small"
      {...rest}
      sx={{
        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
        ...rest.sx,
      }}
    >
      <EvaArrowIosBackFillIcon />
    </IconButton>
  );
});

// ----------------------------------------------------------------------

const NextNavFn = forwardRef<HTMLButtonElement, React.PropsWithoutRef<IconButtonProps>>((rest, ref) => {
  const { nextNavDisabled } = useData("OverviewCardCarousel");
  const { onNextNavClick } = useAction("OverviewCardCarousel");
  const theme = useTheme();

  return (
    <IconButton
      ref={ref}
      variant="outlined"
      disabled={nextNavDisabled}
      onClick={onNextNavClick}
      size="small"
      {...rest}
      sx={{
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
export const OverviewCardCarousel = Object.assign(OverviewCardCarouselFn, {
  Panel: PanelFn,
  Slide: SlideFn,
  PrevNav: PrevNavFn,
  NextNav: NextNavFn,
});
