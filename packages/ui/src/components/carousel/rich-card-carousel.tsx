import { createContext, forwardRef, ReactElement, useContext } from "react";
import { useEmblaPrevNextNav } from "./use-embla-prev-next-nav";
import { Box, BoxProps, IconButton, IconButtonProps, useTheme } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { noneUserSelect, queriesWithoutMedia, stylesColorScheme, varAlpha } from "@/util";
import Grid2, { Grid2Props } from "@mui/material/Unstable_Grid2";
import { EvaArrowIosBackFillIcon, EvaArrowIosForwardFillIcon } from "../svg";

// ----------------------------------------------------------------------

const RichCardCarouselDataContext = createContext<
  Omit<ReturnType<typeof useEmblaPrevNextNav>, "onPrevNavClick" | "onNextNavClick"> | undefined
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
  slots: {
    slides: ReactElement;
    prevNav?: ReactElement | null;
    nextNav?: ReactElement | null;
  };
} & BoxProps;

const RichCardCarouselFn = forwardRef<HTMLDivElement, RichCardCarouselFnProps>(({ slots, ...rest }, ref) => {
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
    <RichCardCarouselDataContext.Provider value={{ prevNavDisabled, nextNavDisabled }}>
      <RichCardCarouselActionsContext.Provider value={{ onPrevNavClick, onNextNavClick }}>
        <Box ref={ref} {...rest} sx={{ position: "relative", ...rest.sx }}>
          <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
            <Grid2 container spacing={1.5} sx={{ flexWrap: "nowrap" }}>
              {slots.slides}
            </Grid2>
          </Box>
          {slots.prevNav}
          {slots.nextNav}
        </Box>
      </RichCardCarouselActionsContext.Provider>
    </RichCardCarouselDataContext.Provider>
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
          [stylesColorScheme.light]: {
            color: theme.vars.palette.common.white,
          },
          [theme.breakpoints.down("sm")]: {
            display: "none",
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
        [stylesColorScheme.light]: {
          color: theme.vars.palette.common.white,
        },
        [theme.breakpoints.down("sm")]: {
          display: "none",
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

export const RichCardCarousel = Object.assign(RichCardCarouselFn, {
  Slide: SlideFn,
  PrevNav: PrevNavFn,
  NextNav: NextNavFn,
});
