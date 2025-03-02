"use client";

import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { PickQueryOptionsData } from "@/shared/lib/react-query/types";
import { useAuthContext } from "@/entities/@auth";
import { channelMeKeys } from "../api/queries";

const ChannelMeListContext = createContext<
  PickQueryOptionsData<ReturnType<typeof channelMeKeys.list>> | null | undefined
>(undefined);

export function useChannelMeListContext() {
  const context = useContext(ChannelMeListContext);

  if (context === undefined) throw new Error(`부모로 <ChannelMeListProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

export function ChannelMeListProvider({ children }: { children?: React.ReactNode }) {
  const { isLoggedIn } = useAuthContext();

  const query = useQuery({
    ...channelMeKeys.list(),
    enabled: isLoggedIn,
    refetchOnMount: false,
  });

  if (isLoggedIn && (query.isPending || query.isError)) {
    return;
  }

  return (
    <ChannelMeListContext.Provider value={isLoggedIn ? query.data : null}>{children}</ChannelMeListContext.Provider>
  );
}
