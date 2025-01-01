"use client";

import { DashboardHeader, DashboardSidebar, DashboardSidebarMain } from "@pency/ui/layouts";
import { StudioSidebarNav } from "./studio-sidebar-nav";
import { StudioSidebarMiniNav } from "./studio-sidebar-mini-nav";
import { UserProfile } from "_core/common";
import { Box } from "@mui/material";
import { BrandPencyTextLogoIcon } from "@pency/ui/components";
import NextLink from "next/link";

export function StudioLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <DashboardHeader slots={{ right: <UserProfile /> }} />
      <DashboardSidebar
        slots={{
          header: (
            <Box component={NextLink} href="/">
              <BrandPencyTextLogoIcon sx={{ width: "fit-content", height: "24px" }} />
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
