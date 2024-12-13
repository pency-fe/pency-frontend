"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { channelMeKeys } from "_core/channel/query/queries";
import { useUserAuthMe } from "_core/user";
import { createContext, useContext } from "react";

const ChannelMeListContext = createContext<
  | UseQueryResult<Awaited<ReturnType<Exclude<ReturnType<typeof channelMeKeys.list>["queryFn"], undefined>>>>["data"]
  | undefined
>(undefined);

export function useChannelMeList() {
  const context = useContext(ChannelMeListContext);

  if (!context) throw new Error(`부모로 <ChannelMeListProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

export function ChannelMeListProvider({ children }: { children?: React.ReactNode }) {
  const { isLoggedIn } = useUserAuthMe();

  const query = useQuery({
    ...channelMeKeys.list(),
    enabled: isLoggedIn,
  });

  return <ChannelMeListContext.Provider value={query.data ?? []}>{children}</ChannelMeListContext.Provider>;
}
