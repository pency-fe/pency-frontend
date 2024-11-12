"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { userKeys } from "../query";
import { getMe } from "../query/api";

const MeContext = createContext<Awaited<ReturnType<typeof getMe>> | undefined>(undefined);

export function useMeValue() {
  const context = useContext(MeContext);

  if (!context) throw new Error(`부모로 <MeProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

type MeProviderProps = {
  children?: React.ReactNode;
};

export function MeProvider({ children }: MeProviderProps) {
  const query = useQuery(userKeys.me());

  if (query.isPending) {
    return;
  }

  return <MeContext.Provider value={query.data}>{children}</MeContext.Provider>;
}
