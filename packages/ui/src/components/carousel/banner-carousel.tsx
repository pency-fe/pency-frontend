import { ReactElement, forwardRef } from "react";
import { Box, BoxProps, IconButton, IconButtonProps, useTheme } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { LazyLoadImage, LazyLoadImageProps } from "react-lazy-load-image-component";
import { useCombinedRefs } from "@pency/util";
import { EvaArrowIosBackFillIcon, EvaArrowIosForwardFillIcon } from "../svg";

// ----------------------------------------------------------------------

type BannerCarouselFnProps = {
  slots: {
    slides: ReactElement;
    prevNav?: ReactElement;
    nextNav?: ReactElement;
  };
} & BoxProps;

const BannerCarouselFn = forwardRef<HTMLDivElement, BannerCarouselFnProps>(({ slots, ...rest }, ref) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);
  const refs = useCombinedRefs(ref, emblaRef);

  return (
    <Box ref={refs} {...rest} sx={{ position: "relative", overflow: "hidden", ...rest.sx }}>
      <Box sx={{ display: "flex" }}>{slots.slides}</Box>
      {slots.prevNav}
      {/* {slots.nextNav} */}
    </Box>
  );
});

// ----------------------------------------------------------------------

type PrevNavFnProps = IconButtonProps;

const PrevNavFn = forwardRef<HTMLButtonElement, PrevNavFnProps>((rest, ref) => {
  return (
    <>
      <IconButton ref={ref} {...rest}>
        <EvaArrowIosBackFillIcon />
      </IconButton>
    </>
  );
});

// ----------------------------------------------------------------------

type NextNavFnProps = IconButtonProps;

const NextNavFn = forwardRef<HTMLButtonElement, NextNavFnProps>((rest, ref) => {
  return (
    <IconButton ref={ref} {...rest}>
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
