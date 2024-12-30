"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

import { PickQueryOptionsData } from "@/shared/lib/react-query/types";
import { userProfileMeKeys } from "../api/queries";
import { useUserAuthMeContext } from "@/shared/user-auth-me";

const UserProfileMeListContext = createContext<
  PickQueryOptionsData<ReturnType<typeof userProfileMeKeys.list>> | null | undefined
>(undefined);

export function useUserProfileMeListContext() {
  const context = useContext(UserProfileMeListContext);

  if (context === undefined) throw new Error(`부모로 <UserProfileMeListProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

export function UserProfileMeListProvider({ children }: { children?: React.ReactNode }) {
  const me = useUserAuthMeContext();

  const query = useQuery({
    ...userProfileMeKeys.list(),
    enabled: me.isLoggedIn,
    refetchOnMount: false,
  });

  if (query.isPending || query.isError) {
    return;
  }

  return (
    <UserProfileMeListContext.Provider value={me.isLoggedIn ? query.data : null}>
      {children}
    </UserProfileMeListContext.Provider>
  );
}
