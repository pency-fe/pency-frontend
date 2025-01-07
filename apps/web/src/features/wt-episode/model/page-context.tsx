"use client";

import { createContext, useContext } from "react";

export const PageContext = createContext<{ page: number | undefined }>({ page: undefined });

export function usePage() {
  const context = useContext(PageContext);

  return context;
}
