"use client";

import { createContext, useContext } from "react";
import { SeriesType } from "@/shared/config/webtoon/const";

// ----------------------------------------------------------------------

export const SeriesTypesContext = createContext<{
  seriesTypes: Array<SeriesType> | undefined;
  setSeriesTypes: ((value: Array<SeriesType>) => void) | undefined;
}>({ seriesTypes: undefined, setSeriesTypes: undefined });

export function useSeriesTypes() {
  const context = useContext(SeriesTypesContext);

  return context;
}
