"use client";

import { createContext, useContext } from "react";
import { Pair } from "@/shared/config/webtoon/const";
import { useSessionStorage } from "@pency/util";

// ----------------------------------------------------------------------

const WtPostPairsContext = createContext<{ pairs: Pair[]; setPairs: (value: Pair[]) => void } | undefined>(undefined);

export function useWtPostPairs() {
  const context = useContext(WtPostPairsContext);

  return context ?? { pairs: undefined, setPairs: undefined };
}

// ----------------------------------------------------------------------

export function WtPostPairsProvider({ children }: { children?: React.ReactNode }) {
  // [TODO]
}

// ----------------------------------------------------------------------

export function WtPostPairsStorageProvider({ children }: { children?: React.ReactNode }) {
  const [pairs, setPairs] = useSessionStorage<Pair[]>("wt-post-pairs", []);

  return <WtPostPairsContext.Provider value={{ pairs, setPairs }}>{children}</WtPostPairsContext.Provider>;
}
