"use client";

import { createContext, useContext } from "react";

const DataContext = createContext<{ publish: boolean; channelUrl: string; id?: number } | undefined>(undefined);

export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error(`<부모로 <WtPostForm /> 컴포넌트가 있어야 합니다.`);
  }

  return context;
}

type DataProviderProps = {
  id?: number;
  publish: boolean;
  channelUrl: string;
  children?: React.ReactNode;
};

export function DataProvider({ children, ...rest }: DataProviderProps) {
  return <DataContext.Provider value={rest}>{children}</DataContext.Provider>;
}
