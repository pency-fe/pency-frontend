"use client";

import { Box, Container, Stack, useTheme } from "@mui/material";
import { dashboardHeaderTokens } from "../header";
import { dashboardSidebarTokens } from "../sidebar";

type DashboardSidebarMainProps = {
  slots?: {
    footer?: React.ReactNode;
  };
  children?: React.ReactNode;
};

export const DashboardSidebarMain = ({ slots, children }: DashboardSidebarMainProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        mt: `var(${dashboardHeaderTokens.height})`,
        transition: theme.transitions.create(["padding-left"], {
          easing: `var(${dashboardSidebarTokens.easing})`,
          duration: `var(${dashboardSidebarTokens.duration})`,
        }),
        [theme.breakpoints.up("sm")]: {
          mt: `var(${dashboardHeaderTokens.upSmHeight})`,
          pl: `var(${dashboardSidebarTokens.upSmWidth})`,
        },
        [theme.breakpoints.up("lg")]: {
          pl: `var(${dashboardSidebarTokens.upLgWidth})`,
        },
      }}
    >
      <Container
        component="main"
        sx={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          maxWidth: "lg",
          pt: theme.spacing(1),
          pb: theme.spacing(8),
        }}
      >
        <Stack
          sx={{
            [theme.breakpoints.up("sm")]: {
              padding: "20px",
            },
          }}
        >
          {children}
        </Stack>
      </Container>

      {slots?.footer}
    </Box>
  );
};
