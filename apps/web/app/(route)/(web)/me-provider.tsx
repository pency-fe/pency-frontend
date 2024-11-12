"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "_core/auth/user/query/api";
import { userKeys } from "_core/auth/user";

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
  const { data } = useQuery(userKeys.me());

  return <MeContext.Provider value={data}>{children}</MeContext.Provider>;
}
