"use client";

import { createContext, useContext } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { userAuthMeKeys } from "../query";

const UserAuthMeContext = createContext<
  | UseQueryResult<Awaited<ReturnType<Exclude<ReturnType<typeof userAuthMeKeys.detail>["queryFn"], undefined>>>>["data"]
  | undefined
>(undefined);

export function useUserAuthMeContext() {
  const context = useContext(UserAuthMeContext);

  if (!context) throw new Error(`부모로 <UserAuthMeProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

export function UserAuthMeProvider({ children }: { children?: React.ReactNode }) {
  const query = useQuery(userAuthMeKeys.detail());

  return <UserAuthMeContext.Provider value={query.data}>{children}</UserAuthMeContext.Provider>;
}
