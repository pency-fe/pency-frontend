"use client";

import { createContext, useContext } from "react";
import { SeriesType } from "@/shared/config/webtoon/const";

// ----------------------------------------------------------------------

export const SeriesTypesContext = createContext<{
  SeriesTypes: SeriesType[] | undefined;
  setSeriesTypes: ((value: SeriesType[]) => void) | undefined;
}>({ SeriesTypes: undefined, setSeriesTypes: undefined });

export function useSeriesTypes() {
  const context = useContext(SeriesTypesContext);

  return context;
}
