"use client";

import { createContext, useContext, useState } from "react";
import { createStore, useStore } from "zustand";

type WtPostFilterFormToggleStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const createWtPostFilterFormToggleStore = () => {
  return createStore<WtPostFilterFormToggleStore>()((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
  }));
};

const WtPostFilterFormToggleContext = createContext<ReturnType<typeof createWtPostFilterFormToggleStore> | undefined>(
  undefined,
);

export const useWtPostFilterFormToggle = <T,>(selector: (state: WtPostFilterFormToggleStore) => T): T => {
  const context = useContext(WtPostFilterFormToggleContext);

  if (!context) throw new Error(`부모로 <WtPostFilterFormToggleProvider /> 컴포넌트가 있어야 합니다.`);

  return useStore(context, selector);
};

export const WtPostFilterFormToggleProvider = ({ children }: { children?: React.ReactNode }) => {
  const [filterFormToggleStore] = useState(createWtPostFilterFormToggleStore);

  return (
    <WtPostFilterFormToggleContext.Provider value={filterFormToggleStore}>
      {children}
    </WtPostFilterFormToggleContext.Provider>
  );
};
