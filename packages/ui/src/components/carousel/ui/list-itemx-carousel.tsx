"use client";

import { forwardRef } from "react";
import { Box, BoxProps, Grid, GridProps, IconButton, IconButtonProps, useTheme } from "@mui/material";
import { EvaArrowIosBackFillIcon, EvaArrowIosForwardFillIcon } from "../../svg";
import { noneUserSelect } from "../../../util";
import { useCombinedRefs } from "@pency/util";
import { listItemxClasses } from "../../list";
import { carouselMediaQueries, CarouselProvider, useAction, useData } from "../model";

// ----------------------------------------------------------------------

const ListItemxCarouselFn = ({ children }: { children?: React.ReactNode }) => {
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
        },
      }}
    >
      {children}
    </CarouselProvider>
  );
};

// ----------------------------------------------------------------------

type PanelFnProps = BoxProps;

const PanelFn = forwardRef<HTMLDivElement, PanelFnProps>(({ children, ...rest }, ref) => {
  const { emblaRef } = useData("ListItemxCarousel");
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

const SlideFn = forwardRef<HTMLDivElement, GridProps>(({ children, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <Grid
      item
      ref={ref}
      xs={11}
      sm={6}
      md={4}
      {...rest}
      sx={{
        flexShrink: 0,
        ...noneUserSelect,
        [`& .${listItemxClasses.root}`]: {
          [theme.breakpoints.up("sm")]: {
            height: "70px",
          },
          [theme.breakpoints.up("md")]: {
            height: "80px",
          },
          [theme.breakpoints.up("lg")]: {
            height: "90px",
          },
        },
        ...rest.sx,
      }}
    >
      {children}
    </Grid>
  );
});

// ----------------------------------------------------------------------

type PrevNavFnProps = IconButtonProps;

const PrevNavFn = forwardRef<HTMLButtonElement, PrevNavFnProps>((rest, ref) => {
  const { prevNavDisabled } = useData("ListItemxCarousel");
  const { onPrevNavClick } = useAction("ListItemxCarousel");
  const theme = useTheme();

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
  const { nextNavDisabled } = useData("ListItemxCarousel");
  const { onNextNavClick } = useAction("ListItemxCarousel");
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

export const ListItemxCarousel = Object.assign(ListItemxCarouselFn, {
  Panel: PanelFn,
  Slide: SlideFn,
  PrevNav: PrevNavFn,
  NextNav: NextNavFn,
});
