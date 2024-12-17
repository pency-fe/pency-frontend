"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { channelMeKeys } from "_core/channel/query/queries";
import { useUserAuthMeContext } from "_core/user";
import { createContext, useContext, useMemo, useRef } from "react";

type ContextValue = Exclude<
  UseQueryResult<Awaited<ReturnType<Exclude<ReturnType<typeof channelMeKeys.list>["queryFn"], undefined>>>>["data"],
  undefined
>;

const ChannelMeListContext = createContext<ContextValue | null | undefined>(undefined);

export function useChannelMeListContext() {
  const context = useContext(ChannelMeListContext);

  if (context === undefined) throw new Error(`부모로 <ChannelMeListProvider /> 컴포넌트가 있어야 합니다.`);
  if (context === null) throw new Error("isLoggedIn이 true일 때만 사용 가능합니다.");

  return context;
}

export function ChannelMeListProvider({ children }: { children?: React.ReactNode }) {
  const { isLoggedIn } = useUserAuthMeContext();

  const query = useQuery({
    ...channelMeKeys.list(),
    enabled: isLoggedIn,
  });

  return (
    <ChannelMeListContext.Provider value={isLoggedIn ? query.data : null}>{children}</ChannelMeListContext.Provider>
  );
}
