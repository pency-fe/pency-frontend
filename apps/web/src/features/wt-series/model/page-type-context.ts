"use client";

import { createContext, useContext } from "react";

export const PageTypeContext = createContext<{ pageType: "DEFAULT" | "CHANNEL" | "BOOKMARK" | "VIEW" | undefined }>({
  pageType: undefined,
});

export function usePageType() {
  const context = useContext(PageTypeContext);

  return context;
}
