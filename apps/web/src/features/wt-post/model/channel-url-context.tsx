"use client";

import { createContext, useContext } from "react";

export const ChannelUrlContext = createContext<{ channelUrl: string | undefined }>({ channelUrl: undefined });

export function useChannelUrl() {
  const context = useContext(ChannelUrlContext);

  return context;
}
