"use client";

import { createContext, useContext, useMemo } from "react";
import { useUserProfileMeListContext } from "./user-profile-me-list-provider";
import { useAuthContext } from "@/shared/auth";

const SelectedUserProfileMeContext = createContext<
  Exclude<ReturnType<typeof useUserProfileMeListContext>, null>[number] | null | undefined
>(undefined);

export function useSelectedUserProfileMeContext() {
  const context = useContext(SelectedUserProfileMeContext);

  if (context === undefined) throw new Error(`부모로 <SelectedUserProfileMeProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

export function SelectedUserProfileMeProvider({ children }: { children?: React.ReactNode }) {
  const { isLoggedIn, userProfileId } = useAuthContext();
  const userProfileMeList = useUserProfileMeListContext();

  const selectedUserProfileMe = useMemo(() => {
    if (!isLoggedIn || !userProfileMeList) {
      return null;
    }

    return userProfileMeList.find((userProfileMe) => userProfileMe.id === userProfileId) ?? null;
  }, [userProfileMeList, userProfileId]);

  return (
    <SelectedUserProfileMeContext.Provider value={selectedUserProfileMe}>
      {children}
    </SelectedUserProfileMeContext.Provider>
  );
}
