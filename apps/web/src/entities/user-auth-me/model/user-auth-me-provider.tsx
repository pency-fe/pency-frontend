"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { userAuthMeKeys } from "../api/queries";
import { PickQueryOptionsData } from "@/shared/lib/react-query/types";

const UserAuthMeContext = createContext<PickQueryOptionsData<ReturnType<typeof userAuthMeKeys.detail>> | undefined>(
  undefined,
);

export function useUserAuthMeContext() {
  const context = useContext(UserAuthMeContext);

  if (!context) throw new Error(`부모로 <UserAuthMeProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

export function UserAuthMeProvider({ children }: { children?: React.ReactNode }) {
  const query = useQuery({ ...userAuthMeKeys.detail(), refetchOnMount: false });

  if (query.isPending || query.isError) {
    return;
  }

  return <UserAuthMeContext.Provider value={query.data}>{children}</UserAuthMeContext.Provider>;
}
