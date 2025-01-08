"use client";

import { createContext, useContext } from "react";
import { Pair } from "@/shared/config/webtoon/const";

// ----------------------------------------------------------------------

export const PairsContext = createContext<{
  pairs: Pair[] | undefined;
  setPairs: ((value: Pair[]) => void) | undefined;
}>({ pairs: undefined, setPairs: undefined });

export function usePairs() {
  const context = useContext(PairsContext);

  return context;
}
