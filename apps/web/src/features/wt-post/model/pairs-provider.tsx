"use client";

import { createContext, useContext } from "react";
import { Pair } from "@/shared/config/webtoon/const";
import { useSessionStorage } from "@pency/util";

// ----------------------------------------------------------------------

const PairsContext = createContext<{ pairs: Pair[]; setPairs: (value: Pair[]) => void } | undefined>(undefined);

export function usePairs() {
  const context = useContext(PairsContext);

  return context ?? { pairs: undefined, setPairs: undefined };
}

// ----------------------------------------------------------------------

export function PairsProvider({ children }: { children?: React.ReactNode }) {
  // [TODO]
  return children;
}

// ----------------------------------------------------------------------

export function PairsStorageProvider({ children }: { children?: React.ReactNode }) {
  const [pairs, setPairs] = useSessionStorage<Pair[]>("wt-post-pairs", []);

  return <PairsContext.Provider value={{ pairs, setPairs }}>{children}</PairsContext.Provider>;
}
