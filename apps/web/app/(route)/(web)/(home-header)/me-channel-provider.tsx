"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { channelMeKeys } from "_core/channel/query/queries";
import { useUserAuthMe } from "_core/user";
import { createContext, useContext } from "react";

const MeChannelContext = createContext<
  | UseQueryResult<Awaited<ReturnType<Exclude<ReturnType<typeof channelMeKeys.list>["queryFn"], undefined>>>>["data"]
  | undefined
>(undefined);

export function useMeChannel() {
  const context = useContext(MeChannelContext);

  if (!context) throw new Error(`부모로 <MeChannelProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

type MeChannelProviderProps = {
  children?: React.ReactNode;
};

export function MeChannelProvider({ children }: MeChannelProviderProps) {
  const { isLoggedIn } = useUserAuthMe();

  const { data } = useQuery({
    ...channelMeKeys.list(),
    enabled: isLoggedIn,
  });

  return <MeChannelContext.Provider value={data}>{children}</MeChannelContext.Provider>;
}
