"use client";

import { forwardRef, ReactElement } from "react";
import { Box, BoxProps, IconButton, IconButtonProps, useTheme } from "@mui/material";
import { noneUserSelect } from "../../util";
import Grid2, { Grid2Props } from "@mui/material/Unstable_Grid2";
import { EvaArrowIosBackFillIcon, EvaArrowIosForwardFillIcon } from "../svg";
import { useCombinedRefs } from "@pency/util";
import { useCardCarouselAction, useCardCarouselData } from "./card-carousel-provider";

// ----------------------------------------------------------------------

type RichCardCarouselFnProps = {
  slots: {
    slides: ReactElement;
  };
} & BoxProps;

const RichCardCarouselFn = forwardRef<HTMLDivElement, RichCardCarouselFnProps>(({ slots, ...rest }, ref) => {
  const { emblaRef } = useCardCarouselData("RichCardCarousel");
  const refs = useCombinedRefs(emblaRef, ref);

  return (
    <Box ref={refs} {...rest} sx={{ overflow: "hidden", ...rest.sx }}>
      <Grid2 container spacing={1.5} sx={{ flexWrap: "nowrap" }}>
        {slots.slides}
      </Grid2>
    </Box>
  );
});

// ----------------------------------------------------------------------

type SlideFnProps = Grid2Props;

const SlideFn = forwardRef<HTMLDivElement, SlideFnProps>(({ children, ...rest }, ref) => {
  return (
    <Grid2 ref={ref} xs={11} sm={6} md={4} lg={3} {...rest} sx={{ flexShrink: 0, ...noneUserSelect, ...rest.sx }}>
      {children}
    </Grid2>
  );
});

// ----------------------------------------------------------------------

type PrevNavFnProps = IconButtonProps;

const PrevNavFn = forwardRef<HTMLButtonElement, PrevNavFnProps>((rest, ref) => {
  const theme = useTheme();
  const { prevNavDisabled } = useCardCarouselData("RichCardCarousel.PrevNav");
  const { onPrevNavClick } = useCardCarouselAction("RichCardCarousel.PrevNav");

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
  const { nextNavDisabled } = useCardCarouselData("RichCardCarousel.NextNav");
  const { onNextNavClick } = useCardCarouselAction("RichCardCarousel.NextNav");
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

export const RichCardCarousel = Object.assign(RichCardCarouselFn, {
  Slide: SlideFn,
  PrevNav: PrevNavFn,
  NextNav: NextNavFn,
});
