"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useContext, useMemo } from "react";

type Sort = "LATEST" | "POPULAR" | "WPOPULAR";

type SortLabel = Partial<Record<Sort, string>>;

const WtPostSortContext = createContext<{ sort: Sort; sortLabel: SortLabel } | undefined>(undefined);

export function useWtPostSort() {
  const context = useContext(WtPostSortContext);

  return context ?? { sort: undefined, sortLabel: undefined };
}

type SortProviderProps = {
  sortLabel: SortLabel;
  children?: React.ReactNode;
};

export const WtPostSortProvider = ({ sortLabel, children }: SortProviderProps) => {
  const sortParam = useSearchParams().get("sort");

  const sort = useMemo(() => {
    if (sortParam && Object.keys(sortLabel).includes(sortParam)) {
      return sortParam as Sort;
    }
    return "LATEST" as Sort;
  }, [sortParam]);

  return <WtPostSortContext.Provider value={{ sort, sortLabel }}>{children}</WtPostSortContext.Provider>;
};
