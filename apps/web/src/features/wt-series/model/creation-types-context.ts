"use client";

import { createContext, useContext } from "react";
import { CreationType } from "@/shared/config/webtoon/const";

// ----------------------------------------------------------------------

export const CreationTypesContext = createContext<{
  creationTypes: Array<CreationType> | undefined;
  setCreationTypes: ((value: Array<CreationType>) => void) | undefined;
}>({ creationTypes: undefined, setCreationTypes: undefined });

export function useCreationTypes() {
  const context = useContext(CreationTypesContext);

  return context;
}
