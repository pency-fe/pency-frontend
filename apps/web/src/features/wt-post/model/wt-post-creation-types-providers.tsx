"use client";

import { createContext, useContext } from "react";
import { CreationType } from "@/shared/config/webtoon/const";
import { useSessionStorage } from "@pency/util";

// ----------------------------------------------------------------------

const WtPostCreationTypesContext = createContext<
  { creationTypes: CreationType[]; setCreationTypes: (value: CreationType[]) => void } | undefined
>(undefined);

export function useWtPostCreationTypes() {
  const context = useContext(WtPostCreationTypesContext);

  return context ?? { creationTypes: undefined, setCreationTypes: undefined };
}

// ----------------------------------------------------------------------

export function WtPostCreationTypesProvider({ children }: { children?: React.ReactNode }) {
  // [TODO]
}

// ----------------------------------------------------------------------

export function WtPostCreationTypesStorageProvider({ children }: { children?: React.ReactNode }) {
  const [creationTypes, setCreationTypes] = useSessionStorage<CreationType[]>("wt-post-creation-types", []);

  return (
    <WtPostCreationTypesContext.Provider value={{ creationTypes, setCreationTypes }}>
      {children}
    </WtPostCreationTypesContext.Provider>
  );
}
