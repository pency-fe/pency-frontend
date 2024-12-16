"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { userProfileMeKeys } from "../query";
import { useUserAuthMeContext } from "_core/user/provider";

const UserProfileMeListContext = createContext<
  | UseQueryResult<
      Awaited<ReturnType<Exclude<ReturnType<typeof userProfileMeKeys.list>["queryFn"], undefined>>>
    >["data"]
  | null
  | undefined
>(undefined);

export function userProfileMeListContext() {
  const context = useContext(UserProfileMeListContext);

  if (context === undefined) throw new Error(`부모로 <UserProfileMeListProvider /> 컴포넌트가 있어야 합니다.`);
  if (context === null) throw new Error("isLoggedIn이 true일 때만 사용 가능합니다.");

  return context;
}

export function UserProfileMeListProvider({ children }: { children?: React.ReactNode }) {
  const { isLoggedIn } = useUserAuthMeContext();

  const query = useQuery({
    ...userProfileMeKeys.list(),
    enabled: isLoggedIn,
  });

  return (
    <UserProfileMeListContext.Provider value={isLoggedIn ? query.data : null}>
      {children}
    </UserProfileMeListContext.Provider>
  );
}
