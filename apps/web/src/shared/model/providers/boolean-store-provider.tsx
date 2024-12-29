"use client";

import { createContext, useContext, useState } from "react";
import { createStore, useStore } from "zustand";

type BooleanStore = {
  bool: boolean;
  toggle: (value?: boolean) => void;
};

const createBooleanStore = () => {
  return createStore<BooleanStore>()((set) => ({
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

const BooleanStoreContext = createContext<ReturnType<typeof createBooleanStore> | undefined>(undefined);

export const useBooleanStore = <T,>(selector: (state: BooleanStore) => T): T => {
  const context = useContext(BooleanStoreContext);

  if (!context) throw new Error(`부모로 <BooleanStoreProvider /> 컴포넌트가 있어야 합니다.`);

  return useStore(context, selector);
};

export const BooleanStoreProvider = ({ children }: { children?: React.ReactNode }) => {
  const [booleanStore] = useState(createBooleanStore);

  return <BooleanStoreContext.Provider value={booleanStore}>{children}</BooleanStoreContext.Provider>;
};
