"use client";

import { useMe } from "(route)/(web)/me-provider";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { channelUserProfileKeys } from "_core/channel/query/queries";
import { createContext, useContext } from "react";

const MeChannelContext = createContext<
  | UseQueryResult<
      Awaited<ReturnType<Exclude<ReturnType<typeof channelUserProfileKeys.list>["queryFn"], undefined>>>
    >["data"]
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
  const me = useMe();
  const { data } = useQuery({
    ...channelUserProfileKeys.list({ id: me.userProfileId as number }),
    enabled: !!me.userProfileId,
  });

  return <MeChannelContext.Provider value={data}>{children}</MeChannelContext.Provider>;
}
