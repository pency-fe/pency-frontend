import { EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";

export const useEmblaPrevNextNav = (emblaApi: EmblaCarouselType | undefined) => {
  const [prevNavDisabled, setPrevNavDisabled] = useState(true);
  const [nextNavDisabled, setNextNavDisabled] = useState(true);

  const onPrevNavClick = useCallback(() => {
    if (!emblaApi) {
      return;
    }
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextNavClick = useCallback(() => {
    if (!emblaApi) {
      return;
    }
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevNavDisabled(!emblaApi.canScrollPrev());
    setNextNavDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevNavDisabled,
    nextNavDisabled,
    onPrevNavClick,
    onNextNavClick,
  };
};
