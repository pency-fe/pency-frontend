"use client";

import { DashboardHeader, DashboardSidebar, DashboardSidebarMain } from "@pency/ui/layouts";
import { StudioSidebarNav } from "./studio-sidebar-nav";
import { StudioSidebarMiniNav } from "./studio-sidebar-mini-nav";

export function StudioLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <DashboardHeader />
      <DashboardSidebar slots={{ nav: <StudioSidebarNav />, miniNav: <StudioSidebarMiniNav /> }} />
      <DashboardSidebarMain>{children}</DashboardSidebarMain>
    </>
  );
}
