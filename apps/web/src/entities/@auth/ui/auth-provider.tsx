"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { PickQueryOptionsData } from "@/shared/lib/react-query/types";
import { authKeys } from "../api/queries";

const AuthContext = createContext<PickQueryOptionsData<ReturnType<typeof authKeys.detail>> | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) throw new Error(`부모로 <AuthProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const query = useQuery({ ...authKeys.detail(), refetchOnMount: false });

  if (query.isPending || query.isError) {
    return;
  }

  return <AuthContext.Provider value={query.data}>{children}</AuthContext.Provider>;
}
