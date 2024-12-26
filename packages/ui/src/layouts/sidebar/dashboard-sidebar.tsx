"use client";

import { Box, GlobalStyles, Stack, useTheme } from "@mui/material";
import { miniNavClasses, navClasses } from "../../components";
import { dashboardHeaderTokens } from "../header";
import { varAlpha } from "../../util";

// ----------------------------------------------------------------------

export const dashboardSidebarTokens = {
  easing: "--layout-dashboard-sidebar-easing",
  duration: "--layout-dashboard-sidebar-duration",
  upSmWidth: "--layout-dashboard-sidebar-up-sm-width",
  upLgWidth: "--layout-dashboard-sidebar-up-lg-width",
};

// ----------------------------------------------------------------------

type DashboardSidebarProps = {
  slots: {
    header: React.ReactNode;
    top?: React.ReactNode;
    nav: React.ReactElement;
    miniNav: React.ReactElement;
    bottom?: React.ReactNode;
  };
};

export function DashboardSidebar({ slots }: DashboardSidebarProps) {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            [dashboardSidebarTokens.easing]: "linear",
            [dashboardSidebarTokens.duration]: "120ms",
            [dashboardSidebarTokens.upSmWidth]: "88px",
            [dashboardSidebarTokens.upLgWidth]: "300px",
          },
        }}
      />
      <Stack
        sx={{
          position: "fixed",
          zIndex: 1101,
          left: 0,
          top: 0,
          display: "none",
          gap: 1,
          height: 1,
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: theme.vars.palette.divider,
          bgcolor: theme.vars.palette.background.default,
          transition: theme.transitions.create(["width"], {
            easing: `var(${dashboardSidebarTokens.easing})`,
            duration: `var(${dashboardSidebarTokens.duration})`,
          }),

          [theme.breakpoints.up("sm")]: {
            display: "flex",
            width: `var(${dashboardSidebarTokens.upSmWidth})`,
            px: theme.spacing(0.5),
          },

          [theme.breakpoints.up("lg")]: {
            width: `var(${dashboardSidebarTokens.upLgWidth})`,
            px: theme.spacing(2),
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            height: `var(${dashboardHeaderTokens.height})`,
            transition: theme.transitions.create(["height"], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
            borderBottomStyle: "solid",
            borderBottomWidth: "1px",
            borderBottomColor: `${varAlpha(theme.vars.palette.grey["500Channel"], 0.04)}`,
            [theme.breakpoints.up("sm")]: {
              minHeight: "auto",
              height: `var(${dashboardHeaderTokens.upSmHeight})`,
            },
          }}
        >
          {slots.header}
        </Box>
        {slots.top}
        <Box
          sx={{
            [theme.breakpoints.down("sm")]: {
              [`& .${miniNavClasses.root}`]: {
                display: "none",
              },
            },
            [theme.breakpoints.down("lg")]: {
              [`& .${navClasses.root}`]: {
                display: "none",
              },
            },
            [theme.breakpoints.up("lg")]: {
              [`& .${miniNavClasses.root}`]: {
                display: "none",
              },
            },
          }}
        >
          {slots.miniNav}
          {slots.nav}
        </Box>
        {slots.bottom}
      </Stack>
    </>
  );
}
