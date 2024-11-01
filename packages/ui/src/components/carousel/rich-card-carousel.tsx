import { createContext, forwardRef, ReactElement, ReactNode, useContext } from "react";
import { useEmblaPrevNextNav } from "./use-embla-prev-next-nav";
import { Box, BoxProps, IconButton, IconButtonProps, useTheme } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { noneUserSelect, queriesWithoutMedia, stylesColorScheme, varAlpha } from "@/util";
import Grid2, { Grid2Props } from "@mui/material/Unstable_Grid2";
import { EvaArrowIosBackFillIcon, EvaArrowIosForwardFillIcon } from "../svg";
import { EmblaViewportRefType } from "node_modules/embla-carousel-react";
import { useCombinedRefs } from "@pency/util";

// ----------------------------------------------------------------------

const RichCardCarouselDataContext = createContext<
  | (Omit<ReturnType<typeof useEmblaPrevNextNav>, "onPrevNavClick" | "onNextNavClick"> & {
      emblaRef: EmblaViewportRefType;
    })
  | undefined
>(undefined);

function useData(component: string) {
  const context = useContext(RichCardCarouselDataContext);

  if (!context) throw new Error(`<${component} />의 부모로 <RichCardCarousel /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

const RichCardCarouselActionsContext = createContext<
  Omit<ReturnType<typeof useEmblaPrevNextNav>, "prevNavDisabled" | "nextNavDisabled"> | undefined
>(undefined);

function useActions(component: string) {
  const context = useContext(RichCardCarouselActionsContext);

  if (!context) throw new Error(`<${component} />의 부모로 <RichCardCarousel /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

type RichCardCarouselFnProps = {
  children?: ReactNode;
};

const RichCardCarouselFn = ({ children }: RichCardCarouselFnProps) => {
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
    <RichCardCarouselDataContext.Provider value={{ prevNavDisabled, nextNavDisabled, emblaRef }}>
      <RichCardCarouselActionsContext.Provider value={{ onPrevNavClick, onNextNavClick }}>
        {children}
      </RichCardCarouselActionsContext.Provider>
    </RichCardCarouselDataContext.Provider>
  );
};

// ----------------------------------------------------------------------

type ContainerFnProps = {
  slots: {
    slides: ReactElement;
  };
} & BoxProps;

const ContainerFn = forwardRef<HTMLDivElement, ContainerFnProps>(({ slots, ...rest }, ref) => {
  const { emblaRef } = useData("RichCardCarousel.Container");
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
  const { prevNavDisabled } = useData("RichCardCarousel.PrevNav");
  const { onPrevNavClick } = useActions("RichCardCarousel.PrevNav");

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
  const { nextNavDisabled } = useData("RichCardCarousel.NextNav");
  const { onNextNavClick } = useActions("RichCardCarousel.NextNav");
  return (
    <IconButton ref={ref} variant="outlined" disabled={nextNavDisabled} onClick={onNextNavClick} {...rest}>
      <EvaArrowIosForwardFillIcon />
    </IconButton>
  );
});

// ----------------------------------------------------------------------

export const RichCardCarousel = Object.assign(RichCardCarouselFn, {
  Container: ContainerFn,
  Slide: SlideFn,
  PrevNav: PrevNavFn,
  NextNav: NextNavFn,
});
