import { Sidebar, SidebarMain } from "@pency/ui/layouts";
import { HomeSidebarNav } from "./home-sidebar-nav";
import { HomeSidebarMiniNav } from "./home-sidebar-mini-nav";

export function HomeSidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar slots={{ nav: <HomeSidebarNav />, miniNav: <HomeSidebarMiniNav /> }} />
      <SidebarMain>{children}</SidebarMain>
    </>
  );
}
