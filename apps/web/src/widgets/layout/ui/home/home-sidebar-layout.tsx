import { Sidebar } from "@pency/ui/layouts";
import { HomeSidebarNav } from "./home-sidebar-nav";
import { HomeSidebarMiniNav } from "./home-sidebar-mini-nav";

export function HomeSidebarLayout() {
  return (
    <>
      <Sidebar slots={{ nav: <HomeSidebarNav />, miniNav: <HomeSidebarMiniNav /> }} />
    </>
  );
}
