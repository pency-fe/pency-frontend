"use client";

import { ReactElement, ReactNode, createContext, forwardRef, useContext } from "react";
import { Box, BoxProps, Grid, GridProps, IconButton, IconButtonProps, useMediaQuery, useTheme } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { EvaArrowIosBackFillIcon, EvaArrowIosForwardFillIcon } from "../svg";
import { noneUserSelect, queriesWithoutMedia } from "@/util";
import { useEmblaPrevNextNav } from "./use-embla-prev-next-nav";
import { EmblaViewportRefType } from "node_modules/embla-carousel-react";
import { useCombinedRefs } from "@pency/util";

// ----------------------------------------------------------------------

const OverviewCardCarouselDataContext = createContext<
  | (Omit<ReturnType<typeof useEmblaPrevNextNav>, "onPrevNavClick" | "onNextNavClick"> & {
      emblaRef: EmblaViewportRefType;
    })
  | undefined
>(undefined);

function useData(component: string) {
  const context = useContext(OverviewCardCarouselDataContext);

  if (!context) throw new Error(`<${component} />의 부모로 <OverviewCardCarousel /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

const OverviewCardCarouselActionsContext = createContext<
  Omit<ReturnType<typeof useEmblaPrevNextNav>, "prevNavDisabled" | "nextNavDisabled"> | undefined
>(undefined);

function useActions(component: string) {
  const context = useContext(OverviewCardCarouselActionsContext);

  if (!context) throw new Error(`<${component} />의 부모로 <OverviewCardCarousel /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

type OverviewCardCarouselFnProps = {
  children?: ReactNode;
};

const OverviewCardCarouselFn = ({ children }: OverviewCardCarouselFnProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    breakpoints: {
      [queriesWithoutMedia.upXs]: {
        slidesToScroll: 1,
      },
      [queriesWithoutMedia.upSm]: {
        slidesToScroll: 2,
      },
      [queriesWithoutMedia.upMd]: {
        slidesToScroll: 3,
      },
      [queriesWithoutMedia.upLg]: {
        slidesToScroll: 4,
      },
    },
  });
  const { prevNavDisabled, nextNavDisabled, onPrevNavClick, onNextNavClick } = useEmblaPrevNextNav(emblaApi);

  return (
    <OverviewCardCarouselDataContext.Provider value={{ prevNavDisabled, nextNavDisabled, emblaRef }}>
      <OverviewCardCarouselActionsContext.Provider value={{ onPrevNavClick, onNextNavClick }}>
        {children}
      </OverviewCardCarouselActionsContext.Provider>
    </OverviewCardCarouselDataContext.Provider>
  );
};

// ----------------------------------------------------------------------

type ContainerFnProps = {
  slots: {
    slides: ReactElement;
  };
} & BoxProps;

const ContainerFn = forwardRef<HTMLDivElement, ContainerFnProps>(({ slots, ...rest }, ref) => {
  const { emblaRef } = useData("OverviewCardCarousel.Container");
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
  const { prevNavDisabled } = useData("OverviewCardCarousel.PrevNav");
  const { onPrevNavClick } = useActions("OverviewCardCarousel.PrevNav");
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <IconButton
        ref={ref}
        variant="outlined"
        disabled={prevNavDisabled}
        onClick={onPrevNavClick}
        size={isUpMd ? "medium" : "small"}
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
  const { nextNavDisabled } = useData("OverviewCardCarousel.NextNav");
  const { onNextNavClick } = useActions("OverviewCardCarousel.NextNav");
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <IconButton
      ref={ref}
      variant="outlined"
      disabled={nextNavDisabled}
      onClick={onNextNavClick}
      size={isUpMd ? "medium" : "small"}
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
  Container: ContainerFn,
  Slide: SlideFn,
  PrevNav: PrevNavFn,
  NextNav: NextNavFn,
});
