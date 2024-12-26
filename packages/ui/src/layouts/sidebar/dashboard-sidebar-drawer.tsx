"use client";

import { Box, Drawer, drawerClasses, DrawerProps, Stack, useTheme } from "@mui/material";
import { dashboardHeaderTokens } from "../header";
import { dashboardSidebarTokens } from "./dashboard-sidebar";

// ----------------------------------------------------------------------

type DashboardSidebarDrawerProps = {
  slots: {
    header: React.ReactNode;
    top?: React.ReactNode;
    nav: React.ReactElement;
    bottom?: React.ReactNode;
  };
  slotProps?: {
    drawer?: DrawerProps;
  };
};

export function DashboardSidebarDrawer({ slots, slotProps }: DashboardSidebarDrawerProps) {
  const theme = useTheme();

  return (
    <Drawer
      {...slotProps?.drawer}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          width: `var(${dashboardSidebarTokens.upLgWidth})`,
          bgcolor: theme.vars.palette.background.default,
        },
        ...slotProps?.drawer?.sx,
      }}
    >
      <Stack sx={{ gap: 1, px: theme.spacing(2) }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            height: `var(${dashboardHeaderTokens.height})`,
          }}
        >
          {slots.header}
        </Box>
        {slots.top}
        {slots.nav}
        {slots.bottom}
      </Stack>
    </Drawer>
  );
}
