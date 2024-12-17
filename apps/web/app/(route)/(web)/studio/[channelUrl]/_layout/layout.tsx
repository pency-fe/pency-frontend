"use client";

import { Header, Sidebar, SidebarMain } from "@pency/ui/layouts";
import { StudioSidebarNav } from "./studio-sidebar-nav";
import { StudioSidebarMiniNav } from "./studio-sidebar-mini-nav";

export function StudioLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Header />
      <Sidebar slots={{ nav: <StudioSidebarNav />, miniNav: <StudioSidebarMiniNav /> }} />
      <SidebarMain>{children}</SidebarMain>
    </>
  );
}
