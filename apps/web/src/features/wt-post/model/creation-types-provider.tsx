"use client";

import { createContext, useContext } from "react";
import { CreationType } from "@/shared/config/webtoon/const";
import { useSessionStorage } from "@pency/util";

// ----------------------------------------------------------------------

const CreationTypesContext = createContext<
  { creationTypes: CreationType[]; setCreationTypes: (value: CreationType[]) => void } | undefined
>(undefined);

export function useCreationTypes() {
  const context = useContext(CreationTypesContext);

  return context ?? { creationTypes: undefined, setCreationTypes: undefined };
}

// ----------------------------------------------------------------------

export function CreationTypesProvider({ children }: { children?: React.ReactNode }) {
  const [creationTypes, setCreationTypes] = useSessionStorage<CreationType[]>("wt-post-gallery-creation-types", []);

  return (
    <CreationTypesContext.Provider value={{ creationTypes, setCreationTypes }}>
      {children}
    </CreationTypesContext.Provider>
  );
}
