import { ReactElement, createContext, forwardRef, useContext } from "react";
import { Box, BoxProps, IconButton, IconButtonProps, useTheme } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { EvaArrowIosBackFillIcon, EvaArrowIosForwardFillIcon } from "../svg";
import { varAlpha } from "@/util";
import { useEmblaPrevNextNav } from "./use-embla-prev-next-nav";

// ----------------------------------------------------------------------

const OverviewCardCarouselDataContext = createContext<
  Omit<ReturnType<typeof useEmblaPrevNextNav>, "onPrevNavClick" | "onNextNavClick"> | undefined
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
  slots: {
    slides: ReactElement;
    prevNav?: ReactElement | null;
    nextNav?: ReactElement | null;
  };
} & BoxProps;

const OverviewCardCarouselFn = forwardRef<HTMLDivElement, OverviewCardCarouselFnProps>(({ slots, ...rest }, ref) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
  const { prevNavDisabled, nextNavDisabled, onPrevNavClick, onNextNavClick } = useEmblaPrevNextNav(emblaApi);

  return (
    <OverviewCardCarouselDataContext.Provider value={{ prevNavDisabled, nextNavDisabled }}>
      <OverviewCardCarouselActionsContext.Provider value={{ onPrevNavClick, onNextNavClick }}>
        <Box ref={ref} {...rest} sx={{ position: "relative", ...rest.sx }}>
          <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
            <Box sx={{ display: "flex" }}>{slots.slides}</Box>
          </Box>
          {slots.prevNav}
          {slots.nextNav}
        </Box>
      </OverviewCardCarouselActionsContext.Provider>
    </OverviewCardCarouselDataContext.Provider>
  );
});

// ----------------------------------------------------------------------

type PrevNavFnProps = IconButtonProps;

const PrevNavFn = forwardRef<HTMLButtonElement, PrevNavFnProps>((rest, ref) => {
  const theme = useTheme();
  const { prevNavDisabled } = useData("BannerCarousel.PrevNav");
  const { onPrevNavClick } = useActions("BannerCarousel.PrevNav");
  return (
    <>
      <IconButton
        ref={ref}
        variant="text"
        disabled={prevNavDisabled}
        onClick={onPrevNavClick}
        {...rest}
        sx={{
          position: "absolute",
          top: "calc(50% - 18px)",
          left: "-18px",
          bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.6),
          ["&:hover"]: {
            bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.8),
          },
          ...(prevNavDisabled && { display: "none" }),
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
  const { nextNavDisabled } = useData("BannerCarousel.NextNav");
  const { onNextNavClick } = useActions("BannerCarousel.NextNav");
  return (
    <IconButton
      ref={ref}
      variant="text"
      disabled={nextNavDisabled}
      onClick={onNextNavClick}
      {...rest}
      sx={{
        position: "absolute",
        top: "calc(50% - 18px)",
        right: "-18px",
        bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.6),
        ["&:hover"]: {
          bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.8),
        },
        ...(nextNavDisabled && { display: "none" }),
        ...rest.sx,
      }}
    >
      <EvaArrowIosForwardFillIcon />
    </IconButton>
  );
});

// ----------------------------------------------------------------------

type SlideFnProps = BoxProps;

const SlideFn = forwardRef<HTMLDivElement, SlideFnProps>(({ children, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <Box
      ref={ref}
      {...rest}
      sx={{
        flex: "0 0 50%",
        display: "flex",
        minWidth: 0,
        mr: theme.spacing(1),
        overflow: "hidden",
        [theme.breakpoints.up("sm")]: {
          flex: "0 0 25%",
        },
        ...rest.sx,
      }}
    >
      {children}
    </Box>
  );
});

// ----------------------------------------------------------------------

export const OverviewCardCarousel = Object.assign(OverviewCardCarouselFn, {
  Slide: SlideFn,
  PrevNav: PrevNavFn,
  NextNav: NextNavFn,
});
