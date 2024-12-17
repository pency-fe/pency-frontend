"use client";

import { useChannelMeListContext } from "_core/channel";
import { useUserAuthMeContext } from "_core/user";
import { useChannelUrlParam } from "_hooks";
import { AccessDenied } from "_views";
import { notFound } from "next/navigation";

export function AccessGuard({ children }: { children?: React.ReactNode }) {
  const me = useUserAuthMeContext();
  const channelMeList = me.isLoggedIn ? useChannelMeListContext() : [];
  const channelUrl = useChannelUrlParam();

  if (!channelUrl.startsWith("@")) {
    notFound();
  }

  if (channelMeList.length === 0 || !channelMeList.some((channel) => channel.url === channelUrl.slice(1))) {
    return <AccessDenied />;
  }

  return children;
}
