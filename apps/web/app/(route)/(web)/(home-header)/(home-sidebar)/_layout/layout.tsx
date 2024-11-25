"use client";

import { Sidebar } from "@pency/ui/layouts";
import { HomeSidebarNav } from "./home-sidebar-nav";

export function HomeSidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar slots={{ nav: <HomeSidebarNav /> }} />
      <Sidebar.Main>{children}</Sidebar.Main>
    </>
  );
}
