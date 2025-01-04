"use client";

import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";

type FilterFormToggleStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const createFilterFormToggleStore = () => {
  return createStore<FilterFormToggleStore>()((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
  }));
};

export const FilterFormToggleContext = createContext<ReturnType<typeof createFilterFormToggleStore> | undefined>(
  undefined,
);

export const useFilterFormToggle = <T,>(selector: (state: FilterFormToggleStore) => T): T => {
  const context = useContext(FilterFormToggleContext);

  if (!context) throw new Error(`부모로 <FilterFormToggleProvider /> 컴포넌트가 있어야 합니다.`);

  return useStore(context, selector);
};
