"use client";

import { createContext, useContext } from "react";
import { Pair } from "@/shared/config/webtoon/const";

// ----------------------------------------------------------------------

export const PairsContext = createContext<{
  pairs: Array<Pair> | undefined;
  setPairs: ((value: Array<Pair>) => void) | undefined;
}>({ pairs: undefined, setPairs: undefined });

export function usePairs() {
  const context = useContext(PairsContext);

  return context;
}
