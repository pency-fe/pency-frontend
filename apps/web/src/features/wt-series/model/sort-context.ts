"use client";

import { createContext, useContext } from "react";

export type Sort = "DEFAULT" | "UPDATE" | "POPULAR" | "WPOPULAR";

export const SortContext = createContext<{ sort: Sort | undefined }>({ sort: undefined });

export function useSort() {
  const context = useContext(SortContext);

  return context;
}
