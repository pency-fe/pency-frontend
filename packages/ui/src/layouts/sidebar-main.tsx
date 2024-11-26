"use client";

import { Box, Container, useTheme } from "@mui/material";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

type SidebarMainProps = {
  slots?: {
    footer?: React.ReactNode;
  };
  children?: React.ReactNode;
};

export const SidebarMain = ({ slots, children }: SidebarMainProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        mt: `var(${Header.token.height})`,
        [theme.breakpoints.up("lg")]: { mt: `var(${Header.token.upSmHeight})` },
        transition: theme.transitions.create(["padding-left"], {
          easing: `var(${Sidebar.token.easing})`,
          duration: `var(${Sidebar.token.duration})`,
        }),
        [theme.breakpoints.up("sm")]: {
          pl: `var(${Sidebar.token.upSmWidth})`,
        },
        [theme.breakpoints.up("lg")]: {
          pl: `var(${Sidebar.token.upLgWidth})`,
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
        {children}
      </Container>

      {slots?.footer}
    </Box>
  );
};
