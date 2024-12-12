"use client";

import { createContext, useContext } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { userAuthMeKeys } from "../query";

const AuthMeContext = createContext<
  | UseQueryResult<Awaited<ReturnType<Exclude<ReturnType<typeof userAuthMeKeys.detail>["queryFn"], undefined>>>>["data"]
  | undefined
>(undefined);

export function useAuthMe() {
  const context = useContext(AuthMeContext);

  if (!context) throw new Error(`부모로 <AuthMeProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

export function AuthMeProvider({ children }: { children?: React.ReactNode }) {
  const { data } = useQuery(userAuthMeKeys.detail());

  return <AuthMeContext.Provider value={data}>{children}</AuthMeContext.Provider>;
}
