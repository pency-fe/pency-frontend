"use client";

import { ReactElement, ReactNode, createContext, forwardRef, useContext } from "react";
import { Box, BoxProps, Grid, GridProps, IconButton, IconButtonProps } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { EvaArrowIosBackFillIcon, EvaArrowIosForwardFillIcon } from "../svg";
import { noneUserSelect, queriesWithoutMedia } from "@/util";
import { useEmblaPrevNextNav } from "./use-embla-prev-next-nav";
import { EmblaViewportRefType } from "node_modules/embla-carousel-react";
import { useCombinedRefs } from "@pency/util";

// ----------------------------------------------------------------------

const ListRankCarouselDataContext = createContext<
  | (Omit<ReturnType<typeof useEmblaPrevNextNav>, "onPrevNavClick" | "onNextNavClick"> & {
      emblaRef: EmblaViewportRefType;
    })
  | undefined
>(undefined);

function useData(component: string) {
  const context = useContext(ListRankCarouselDataContext);

  if (!context) throw new Error(`<${component} />의 부모로 <ListRankCarousel /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

const ListRankCarouselActionsContext = createContext<
  Omit<ReturnType<typeof useEmblaPrevNextNav>, "prevNavDisabled" | "nextNavDisabled"> | undefined
>(undefined);

function useActions(component: string) {
  const context = useContext(ListRankCarouselActionsContext);

  if (!context) throw new Error(`<${component} />의 부모로 <ListRankCarousel /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

type ListRankCarouselFnProps = {
  children?: ReactNode;
};

const ListRankCarouselFn = ({ children }: ListRankCarouselFnProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    breakpoints: {
      [queriesWithoutMedia.upXs]: {
        slidesToScroll: 1,
      },
    },
  });
  const { prevNavDisabled, nextNavDisabled, onPrevNavClick, onNextNavClick } = useEmblaPrevNextNav(emblaApi);

  return (
    <ListRankCarouselDataContext.Provider value={{ prevNavDisabled, nextNavDisabled, emblaRef }}>
      <ListRankCarouselActionsContext.Provider value={{ onPrevNavClick, onNextNavClick }}>
        {children}
      </ListRankCarouselActionsContext.Provider>
    </ListRankCarouselDataContext.Provider>
  );
};

// ----------------------------------------------------------------------

type ContainerFnProps = {
  slots: {
    slides: ReactElement;
  };
} & BoxProps;

const ContainerFn = forwardRef<HTMLDivElement, ContainerFnProps>(({ slots, ...rest }, ref) => {
  const { emblaRef } = useData("ListRankCarousel.Container");
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
    <>
      {Array.from({ length: 6 }, () => (
        <Grid
          item
          ref={ref}
          xs={11}
          sm={6}
          md={6}
          lg={4}
          {...rest}
          sx={{ flexShrink: 0, ...noneUserSelect, ...rest.sx }}
        >
          {Array.from({ length: 3 }, () => children)}
        </Grid>
      ))}
    </>
  );
});

// ----------------------------------------------------------------------

type PrevNavFnProps = IconButtonProps;

const PrevNavFn = forwardRef<HTMLButtonElement, PrevNavFnProps>((rest, ref) => {
  const { prevNavDisabled } = useData("ListRankCarousel.PrevNav");
  const { onPrevNavClick } = useActions("ListRankCarousel.PrevNav");

  return (
    <>
      <IconButton ref={ref} variant="outlined" disabled={prevNavDisabled} onClick={onPrevNavClick} {...rest}>
        <EvaArrowIosBackFillIcon />
      </IconButton>
    </>
  );
});

// ----------------------------------------------------------------------

type NextNavFnProps = IconButtonProps;

const NextNavFn = forwardRef<HTMLButtonElement, NextNavFnProps>((rest, ref) => {
  const { nextNavDisabled } = useData("ListRankCarousel.NextNav");
  const { onNextNavClick } = useActions("ListRankCarousel.NextNav");
  return (
    <IconButton ref={ref} variant="outlined" disabled={nextNavDisabled} onClick={onNextNavClick} {...rest}>
      <EvaArrowIosForwardFillIcon />
    </IconButton>
  );
});

// ----------------------------------------------------------------------

export const ListRankCarousel = Object.assign(ListRankCarouselFn, {
  Container: ContainerFn,
  Slide: SlideFn,
  PrevNav: PrevNavFn,
  NextNav: NextNavFn,
});
