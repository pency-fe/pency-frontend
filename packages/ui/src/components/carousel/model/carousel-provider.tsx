"use client";

import { createContext, useContext } from "react";
import useEmblaCarousel, { EmblaViewportRefType } from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { useEmblaPrevNextNav } from "./use-embla-prev-next-nav";
import { EmblaPluginType } from "embla-carousel";

const DataContext = createContext<
  | (Pick<ReturnType<typeof useEmblaPrevNextNav>, "prevNavDisabled" | "nextNavDisabled"> & {
      emblaRef: EmblaViewportRefType;
    })
  | undefined
>(undefined);

export function useData(component: string) {
  const context = useContext(DataContext);

  if (!context) throw new Error(`부모로 <${component} /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

const ActionContext = createContext<
  Pick<ReturnType<typeof useEmblaPrevNextNav>, "onPrevNavClick" | "onNextNavClick"> | undefined
>(undefined);

export function useAction(component: string) {
  const context = useContext(ActionContext);

  if (!context) throw new Error(`부모로 <${component} /> 컴포넌트가 있어야 합니다.`);

  return context;
}

// ----------------------------------------------------------------------

type CarouselProviderProps = {
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  children?: React.ReactNode;
};

export const CarouselProvider = ({ options, plugins, children }: CarouselProviderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const { prevNavDisabled, nextNavDisabled, onPrevNavClick, onNextNavClick } = useEmblaPrevNextNav(emblaApi);

  return (
    <DataContext.Provider value={{ prevNavDisabled, nextNavDisabled, emblaRef }}>
      <ActionContext.Provider value={{ onPrevNavClick, onNextNavClick }}>{children}</ActionContext.Provider>
    </DataContext.Provider>
  );
};
