"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useRef } from "react";
import { userProfileMeKeys } from "../query";
import { useUserAuthMeContext } from "_core/user/provider";

type ContextValue = Exclude<
  UseQueryResult<Awaited<ReturnType<Exclude<ReturnType<typeof userProfileMeKeys.list>["queryFn"], undefined>>>>["data"],
  undefined
>;

const UserProfileMeListContext = createContext<ContextValue | null | undefined>(undefined);

export function useUserProfileMeListContext() {
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
    refetchOnMount: false,
  });

  return (
    <UserProfileMeListContext.Provider value={isLoggedIn ? query.data : null}>
      {children}
    </UserProfileMeListContext.Provider>
  );
}

// ----------------------------------------------------------------------

const SelectedUserProfileMeContext = createContext<ContextValue[number] | null | undefined>(undefined);

export function useSelectedUserProfileMeContext() {
  const context = useContext(SelectedUserProfileMeContext);

  if (context === undefined) throw new Error(`부모로 <SelectedUserProfileMeProvider /> 컴포넌트가 있어야 합니다.`);
  if (context === null) throw new Error("isLoggedIn이 true일 때만 사용 가능합니다.");

  return context;
}

export function SelectedUserProfileMeProvider({ children }: { children?: React.ReactNode }) {
  const { isLoggedIn, userProfileId } = useUserAuthMeContext();
  const temp = useRef([]).current;

  const userProfileMeList = isLoggedIn ? useUserProfileMeListContext() : temp;

  const selectedUserProfileMe = useMemo(() => {
    return userProfileMeList.find((userProfileMe) => userProfileMe.id === userProfileId) ?? null;
  }, [userProfileMeList, userProfileId]);

  return (
    <SelectedUserProfileMeContext.Provider value={selectedUserProfileMe}>
      {children}
    </SelectedUserProfileMeContext.Provider>
  );
}
