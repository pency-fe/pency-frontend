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
  });

  return (
    <UserProfileMeListContext.Provider value={isLoggedIn ? query.data : null}>
      {children}
    </UserProfileMeListContext.Provider>
  );
}

// 1. layout에서 Prefetch했잖아.
// 2. List Provider에서 prefetch했던 데이터 내려보내지.
// 3. List Provider에서 내려줬던 데이터를 me Provider에서 받아. -> 선택된 유저프로필 추출한다. -> 추출한 데이터를 내려보내.

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
