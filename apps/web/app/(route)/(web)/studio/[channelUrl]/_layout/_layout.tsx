"use client";

import { DashboardHeader, DashboardSidebar, DashboardSidebarMain } from "@pency/ui/layouts";
import { StudioSidebarNav } from "./studio-sidebar-nav";
import { StudioSidebarMiniNav } from "./studio-sidebar-mini-nav";
import { UserProfile } from "_core/common";
import { Box } from "@mui/material";
import { BrandPencyTextLogoIcon } from "@pency/ui/components";

export function StudioLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <DashboardHeader slots={{ right: <UserProfile /> }} />
      <DashboardSidebar
        slots={{
          header: (
            <Box component="a" href="/" sx={{ color: "inherit", width: "128px", height: "24px" }}>
              <BrandPencyTextLogoIcon sx={{ width: 1, height: 1 }} />
            </Box>
          ),
          nav: <StudioSidebarNav />,
          miniNav: <StudioSidebarMiniNav />,
        }}
      />
      <DashboardSidebarMain>{children}</DashboardSidebarMain>
    </>
  );
}
