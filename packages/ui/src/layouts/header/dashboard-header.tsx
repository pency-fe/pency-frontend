"use client";

import { AppBar, AppBarProps, Box, Container, GlobalStyles, Toolbar, useTheme } from "@mui/material";
import { forwardRef, PropsWithoutRef } from "react";
import { dashboardSidebarTokens } from "../sidebar";

export const dashboardHeaderTokens = {
  height: "--layout-dashboard-header-height",
  upSmHeight: "--layout-dashboard-header-up-sm-height",
};

type DashboardHeaderProps = PropsWithoutRef<AppBarProps> & {
  slots?: {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
  };
};

export const DashboardHeader = forwardRef<HTMLHeadElement, DashboardHeaderProps>(({ slots }, ref) => {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            [dashboardHeaderTokens.height]: "52px",
            [dashboardHeaderTokens.upSmHeight]: "56px",
          },
        }}
      />
      <AppBar
        ref={ref}
        sx={{
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: theme.vars.palette.divider,
          transition: theme.transitions.create(["padding-left"], {
            easing: `var(${dashboardSidebarTokens.easing})`,
            duration: `var(${dashboardSidebarTokens.duration})`,
          }),
          [theme.breakpoints.up("sm")]: {
            pl: `var(${dashboardSidebarTokens.upSmWidth})`,
          },
          [theme.breakpoints.up("lg")]: {
            pl: `var(${dashboardSidebarTokens.upLgWidth})`,
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: "auto",
            height: `var(${dashboardHeaderTokens.height})`,
            transition: theme.transitions.create(["height"], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
            bgcolor: theme.vars.palette.background.default,

            [theme.breakpoints.up("sm")]: {
              minHeight: "auto",
              height: `var(${dashboardHeaderTokens.upSmHeight})`,
            },
          }}
        >
          <Container
            maxWidth={false}
            sx={{
              height: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            {slots?.left}
            <Box sx={{ display: "flex", flex: "1 1 auto", justifyContent: "center" }}>{slots?.center}</Box>
            {slots?.right}
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
});
