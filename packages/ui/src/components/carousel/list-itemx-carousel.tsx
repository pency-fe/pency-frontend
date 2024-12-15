"use client";

import { ReactElement, ReactNode, createContext, forwardRef, useContext } from "react";
import { Box, BoxProps, Grid, GridProps, IconButton, IconButtonProps, useMediaQuery, useTheme } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { EvaArrowIosBackFillIcon, EvaArrowIosForwardFillIcon } from "../svg";
import { noneUserSelect, queriesWithoutMedia } from "@/util";
import { useEmblaPrevNextNav } from "./use-embla-prev-next-nav";
import { EmblaViewportRefType } from "node_modules/embla-carousel-react";
import { useCombinedRefs } from "@pency/util";
import { listItemxClasses } from "../list";

// ----------------------------------------------------------------------

const ListItemxCarouselDataContext = createContext<
  | (Omit<ReturnType<typeof useEmblaPrevNextNav>, "onPrevNavClick" | "onNextNavClick"> & {
      emblaRef: EmblaViewportRefType;
    })
  | undefined
>(undefined);

function useData(component: string) {
  const context = useContext(ListItemxCarouselDataContext);

  if (!context) throw new Error(`<${component} />의 부모로 <ListItemxCarousel /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

const ListItemxCarouselActionsContext = createContext<
  Omit<ReturnType<typeof useEmblaPrevNextNav>, "prevNavDisabled" | "nextNavDisabled"> | undefined
>(undefined);

function useActions(component: string) {
  const context = useContext(ListItemxCarouselActionsContext);

  if (!context) throw new Error(`<${component} />의 부모로 <ListItemxCarousel /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

type ListItemxCarouselFnProps = {
  children?: ReactNode;
};

const ListItemxCarouselFn = ({ children }: ListItemxCarouselFnProps) => {
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
    },
  });
  const { prevNavDisabled, nextNavDisabled, onPrevNavClick, onNextNavClick } = useEmblaPrevNextNav(emblaApi);

  return (
    <ListItemxCarouselDataContext.Provider value={{ prevNavDisabled, nextNavDisabled, emblaRef }}>
      <ListItemxCarouselActionsContext.Provider value={{ onPrevNavClick, onNextNavClick }}>
        {children}
      </ListItemxCarouselActionsContext.Provider>
    </ListItemxCarouselDataContext.Provider>
  );
};

// ----------------------------------------------------------------------

type ContainerFnProps = {
  slots: {
    slides: ReactElement;
  };
} & BoxProps;

const ContainerFn = forwardRef<HTMLDivElement, ContainerFnProps>(({ slots, ...rest }, ref) => {
  const { emblaRef } = useData("ListItemxCarousel.Container");
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
  const theme = useTheme();

  return (
    <>
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
    </>
  );
});

// ----------------------------------------------------------------------

type PrevNavFnProps = IconButtonProps;

const PrevNavFn = forwardRef<HTMLButtonElement, PrevNavFnProps>((rest, ref) => {
  const theme = useTheme();
  const { prevNavDisabled } = useData("ListItemxCarousel.PrevNav");
  const { onPrevNavClick } = useActions("ListItemxCarousel.PrevNav");
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
  const { nextNavDisabled } = useData("ListItemxCarousel.NextNav");
  const { onNextNavClick } = useActions("ListItemxCarousel.NextNav");
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

export const ListItemxCarousel = Object.assign(ListItemxCarouselFn, {
  Container: ContainerFn,
  Slide: SlideFn,
  PrevNav: PrevNavFn,
  NextNav: NextNavFn,
});
