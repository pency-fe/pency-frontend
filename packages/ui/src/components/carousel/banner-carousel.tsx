import { ReactElement, createContext, forwardRef, useContext, useMemo } from "react";
import { Box, BoxProps, IconButton, IconButtonProps, useTheme } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";
import { EvaArrowIosBackFillIcon, EvaArrowIosForwardFillIcon } from "../svg";
import { varAlpha } from "@/util";

// ----------------------------------------------------------------------

const BannerCarouselActionsContext = createContext<{ scrollPrev(): void; scrollNext(): void } | undefined>(undefined);

function useActions(component: string) {
  const context = useContext(BannerCarouselActionsContext);

  if (!context) throw new Error(`<${component} />의 부모로 <BannerCarousel /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

type BannerCarouselFnProps = {
  slots: {
    slides: ReactElement;
    prevNav?: ReactElement;
    nextNav?: ReactElement;
  };
} & BoxProps;

const BannerCarouselFn = forwardRef<HTMLDivElement, BannerCarouselFnProps>(({ slots, ...rest }, ref) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

  const actions = useMemo(
    () => ({
      scrollPrev: () => {
        if (!emblaApi) {
          return;
        }
        emblaApi.plugins().autoplay.reset();
        emblaApi.scrollPrev();
      },
      scrollNext: () => {
        if (!emblaApi) {
          return;
        }
        emblaApi.plugins().autoplay.reset();
        emblaApi.scrollNext();
      },
    }),
    [emblaApi],
  );

  return (
    <BannerCarouselActionsContext.Provider value={actions}>
      <Box ref={ref} {...rest} sx={{ position: "relative", ...rest.sx }}>
        <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
          <Box sx={{ display: "flex" }}>{slots.slides}</Box>
        </Box>
        {slots.prevNav}
        {slots.nextNav}
      </Box>
    </BannerCarouselActionsContext.Provider>
  );
});

// ----------------------------------------------------------------------

type PrevNavFnProps = IconButtonProps;

const PrevNavFn = forwardRef<HTMLButtonElement, PrevNavFnProps>((rest, ref) => {
  const theme = useTheme();
  const { scrollPrev } = useActions("BannerCarousel.PrevNav");
  return (
    <>
      <IconButton
        ref={ref}
        variant="text"
        onClick={scrollPrev}
        {...rest}
        sx={{
          position: "absolute",
          top: "calc(50% - 18px)",
          left: "9px",
          bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.6),
          ["&:hover"]: {
            bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.8),
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
  const { scrollNext } = useActions("BannerCarousel.NextNav");
  return (
    <IconButton
      ref={ref}
      variant="text"
      onClick={scrollNext}
      {...rest}
      sx={{
        position: "absolute",
        top: "calc(50% - 18px)",
        right: "9px",
        bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.6),
        ["&:hover"]: {
          bgcolor: varAlpha(theme.vars.palette.grey["800Channel"], 0.8),
        },
        ...rest.sx,
      }}
    >
      <EvaArrowIosForwardFillIcon />
    </IconButton>
  );
});

// ----------------------------------------------------------------------

type SlideFnProps = {
  slots: {
    image: ReactElement;
  };
} & BoxProps;

const SlideFn = forwardRef<HTMLDivElement, SlideFnProps>(({ slots, ...rest }, ref) => {
  const theme = useTheme();

  return (
    <Box
      ref={ref}
      {...rest}
      sx={{
        flex: "0 0 100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: 0,
        ml: theme.spacing(1),
        borderRadius: theme.spacing(2),
        overflow: "hidden",
        [theme.breakpoints.up("sm")]: {
          flex: "0 0 80%",
        },
        [theme.breakpoints.up("lg")]: {
          flex: "0 0 50%",
        },
        ...rest.sx,
      }}
    >
      {slots.image}
    </Box>
  );
});

type ImageFnProps = Omit<BoxProps & LazyLoadImageProps, "children">;

const ImageFn = forwardRef<HTMLImageElement, ImageFnProps>((rest, ref) => {
  return <Box ref={ref} component={LazyLoadImage} {...rest} sx={{ width: 1, objectFit: "cover", ...rest.sx }} />;
});

// ----------------------------------------------------------------------

export const BannerCarousel = Object.assign(BannerCarouselFn, {
  Slide: Object.assign(SlideFn, {
    Image: ImageFn,
  }),
  PrevNav: PrevNavFn,
  NextNav: NextNavFn,
});
