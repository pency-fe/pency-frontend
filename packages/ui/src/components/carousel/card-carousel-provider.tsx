import { createContext, useContext } from "react";
import { useEmblaPrevNextNav } from "./use-embla-prev-next-nav";
import useEmblaCarousel, { EmblaViewportRefType } from "embla-carousel-react";
import { queriesWithoutMedia } from "../../util";

const CardCarouselDataContext = createContext<
  | (Omit<ReturnType<typeof useEmblaPrevNextNav>, "onPrevNavClick" | "onNextNavClick"> & {
      emblaRef: EmblaViewportRefType;
    })
  | undefined
>(undefined);

export function useCardCarouselData(component: string) {
  const context = useContext(CardCarouselDataContext);

  if (!context) throw new Error(`<${component} />의 부모로 <CardCarouselProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

const CardCarouselActionContext = createContext<
  Omit<ReturnType<typeof useEmblaPrevNextNav>, "prevNavDisabled" | "nextNavDisabled"> | undefined
>(undefined);

export function useCardCarouselAction(component: string) {
  const context = useContext(CardCarouselActionContext);

  if (!context) throw new Error(`<${component} />의 부모로 <CardCarouselProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

type CardCarouselFnProps = {
  children?: React.ReactNode;
};

export const CardCarouselProvider = ({ children }: CardCarouselFnProps) => {
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
    <CardCarouselDataContext.Provider value={{ prevNavDisabled, nextNavDisabled, emblaRef }}>
      <CardCarouselActionContext.Provider value={{ onPrevNavClick, onNextNavClick }}>
        {children}
      </CardCarouselActionContext.Provider>
    </CardCarouselDataContext.Provider>
  );
};
