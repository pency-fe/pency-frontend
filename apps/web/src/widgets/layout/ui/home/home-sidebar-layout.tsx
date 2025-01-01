import { Sidebar, SidebarMain } from "@pency/ui/layouts";
import { HomeSidebarNav } from "../../model/home/home-sidebar-nav";
import { HomeSidebarMiniNav } from "../../model/home/home-sidebar-mini-nav";

export function HomeSidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar slots={{ nav: <HomeSidebarNav />, miniNav: <HomeSidebarMiniNav /> }} />
      <SidebarMain>{children}</SidebarMain>
    </>
  );
}
