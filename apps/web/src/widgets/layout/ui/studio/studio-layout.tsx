"use client";

import NextLink from "next/link";
import { Box } from "@mui/material";
import { DashboardHeader, DashboardSidebar, DashboardSidebarMain } from "@pency/ui/layouts";
import { BrandPencyTextLogoIcon } from "@pency/ui/components";
import { StudioSidebarNav } from "./studio-sidebar-nav";
import { StudioSidebarMiniNav } from "./studio-sidebar-mini-nav";
import { UserProfileAvatar } from "../user-profile-avatar";

export const StudioLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <DashboardHeader slots={{ right: <UserProfileAvatar /> }} />
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
};
