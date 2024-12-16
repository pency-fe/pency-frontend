"use client";

import { notFound } from "next/navigation";
import { Header, Sidebar, SidebarMain } from "@pency/ui/layouts";
import { useChannelMeListContext } from "_core/channel";
import { useUserAuthMeContext } from "_core/user";
import { useChannelUrlParam } from "_hooks";
import { AccessDenied } from "_views";
import { StudioSidebarNav } from "./studio-sidebar-nav";
import { StudioSidebarMiniNav } from "./studio-sidebar-mini-nav";

export function StudioLayout({ children }: { children: React.ReactNode }) {
  const me = useUserAuthMeContext();
  const channelMeList = me.isLoggedIn ? useChannelMeListContext() : [];
  const channelUrl = useChannelUrlParam();

  if (!channelUrl.startsWith("@")) {
    notFound();
  }

  if (channelMeList.length === 0 || !channelMeList.some((channel) => channel.url === channelUrl.slice(1))) {
    return <AccessDenied />;
  }

  return (
    <>
      <Header />
      <Sidebar slots={{ nav: <StudioSidebarNav />, miniNav: <StudioSidebarMiniNav /> }} />
      <SidebarMain>{children}</SidebarMain>
    </>
  );
}
