"use client";

import { createContext, useContext, useState } from "react";
import { createStore, useStore } from "zustand";

type FilterFormToggleStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const createFilterFormToggleStore = () => {
  return createStore<FilterFormToggleStore>()((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
  }));
};

const FilterFormToggleContext = createContext<ReturnType<typeof createFilterFormToggleStore> | undefined>(undefined);

export const useFilterFormToggle = <T,>(selector: (state: FilterFormToggleStore) => T): T => {
  const context = useContext(FilterFormToggleContext);

  if (!context) throw new Error(`부모로 <FilterFormToggleProvider /> 컴포넌트가 있어야 합니다.`);

  return useStore(context, selector);
};

export const FilterFormToggleProvider = ({ children }: { children?: React.ReactNode }) => {
  const [filterFormToggleStore] = useState(createFilterFormToggleStore);

  return <FilterFormToggleContext.Provider value={filterFormToggleStore}>{children}</FilterFormToggleContext.Provider>;
};
