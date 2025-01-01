"use client";

import { createContext, useContext, useState } from "react";
import { createStore, useStore } from "zustand";

type ToggleStore = {
  bool: boolean;
  toggle: (value?: boolean) => void;
};

const createToggleStore = () => {
  return createStore<ToggleStore>()((set) => ({
    bool: false,
    toggle: (value?: boolean) =>
      set(({ bool }) => {
        if (value !== undefined) {
          return { bool: value };
        }

        return { bool: !bool };
      }),
  }));
};

const ToggleStoreContext = createContext<ReturnType<typeof createToggleStore> | undefined>(undefined);

export const useToggleStore = <T,>(selector: (state: ToggleStore) => T): T => {
  const context = useContext(ToggleStoreContext);

  if (!context) throw new Error(`부모로 <ToggleStoreProvider /> 컴포넌트가 있어야 합니다.`);

  return useStore(context, selector);
};

export const ToggleStoreProvider = ({ children }: { children?: React.ReactNode }) => {
  const [booleanStore] = useState(createToggleStore);

  return <ToggleStoreContext.Provider value={booleanStore}>{children}</ToggleStoreContext.Provider>;
};
