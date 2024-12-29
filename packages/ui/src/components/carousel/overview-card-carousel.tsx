"use client";

import { ReactElement, forwardRef } from "react";
import { Box, BoxProps, Grid, GridProps, IconButton, IconButtonProps, useTheme } from "@mui/material";
import { EvaArrowIosBackFillIcon, EvaArrowIosForwardFillIcon } from "../svg";
import { noneUserSelect } from "../../util";
import { useCombinedRefs } from "@pency/util";
import { useCardCarouselAction, useCardCarouselData } from "./card-carousel-provider";

// ----------------------------------------------------------------------

type OverviewCardCarouselFnProps = {
  slots: {
    slides: ReactElement;
  };
} & BoxProps;

const OverviewCardCarouselFn = forwardRef<HTMLDivElement, OverviewCardCarouselFnProps>(({ slots, ...rest }, ref) => {
  const { emblaRef } = useCardCarouselData("OverviewCardCarousel");
  const refs = useCombinedRefs(emblaRef, ref);

  return (
    <Box ref={refs} {...rest} sx={{ overflow: "hidden", ...rest.sx }}>
      <Grid container spacing={1.5} sx={{ flexWrap: "nowrap" }}>
        {slots.slides}
      </Grid>
    </Box>
  );
});

// ----------------------------------------------------------------------

type SlideFnProps = GridProps;

const SlideFn = forwardRef<HTMLDivElement, SlideFnProps>(({ children, ...rest }, ref) => {
  return (
    <Grid item ref={ref} xs={11} sm={6} md={4} lg={3} {...rest} sx={{ flexShrink: 0, ...noneUserSelect, ...rest.sx }}>
      {children}
    </Grid>
  );
});

// ----------------------------------------------------------------------

type PrevNavFnProps = IconButtonProps;

const PrevNavFn = forwardRef<HTMLButtonElement, PrevNavFnProps>((rest, ref) => {
  const theme = useTheme();
  const { prevNavDisabled } = useCardCarouselData("OverviewCardCarousel.PrevNav");
  const { onPrevNavClick } = useCardCarouselAction("OverviewCardCarousel.PrevNav");

  return (
    <>
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
    </>
  );
});

// ----------------------------------------------------------------------

type NextNavFnProps = IconButtonProps;

const NextNavFn = forwardRef<HTMLButtonElement, NextNavFnProps>((rest, ref) => {
  const theme = useTheme();
  const { nextNavDisabled } = useCardCarouselData("OverviewCardCarousel.NextNav");
  const { onNextNavClick } = useCardCarouselAction("OverviewCardCarousel.NextNav");

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
  Slide: SlideFn,
  PrevNav: PrevNavFn,
  NextNav: NextNavFn,
});
