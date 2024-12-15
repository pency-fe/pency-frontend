"use client";

import { Box, Container, useTheme } from "@mui/material";
import { headerTokens } from "./header";
import { sidebarTokens } from "./sidebar";

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
        mt: `var(${headerTokens.height})`,
        [theme.breakpoints.up("lg")]: { mt: `var(${headerTokens.upSmHeight})` },
        transition: theme.transitions.create(["padding-left"], {
          easing: `var(${sidebarTokens.easing})`,
          duration: `var(${sidebarTokens.duration})`,
        }),
        [theme.breakpoints.up("sm")]: {
          pl: `var(${sidebarTokens.upSmWidth})`,
        },
        [theme.breakpoints.up("lg")]: {
          pl: `var(${sidebarTokens.upLgWidth})`,
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
