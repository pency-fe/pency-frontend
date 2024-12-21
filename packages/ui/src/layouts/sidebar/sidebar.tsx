"use client";

import { Box, GlobalStyles, useTheme } from "@mui/material";
import { headerTokens } from "../header/header";
import { miniNavClasses, navClasses } from "../../components";
import { sidebarClasses } from "../classes";

// ----------------------------------------------------------------------

export const sidebarTokens = {
  easing: "--layout-sidebar-easing",
  duration: "--layout-sidebar-duration",
  upSmWidth: "--layout-sidebar-up-sm-width",
  upLgWidth: "--layout-sidebar-up-lg-width",
};

// ----------------------------------------------------------------------

type SidebarProps = {
  slots: {
    nav: React.ReactElement;
    miniNav: React.ReactElement;
  };
};

export function Sidebar({ slots }: SidebarProps) {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            [sidebarTokens.easing]: "linear",
            [sidebarTokens.duration]: "120ms",
            [sidebarTokens.upSmWidth]: "88px",
            [sidebarTokens.upLgWidth]: "300px",
          },
        }}
      />
      <Box
        className={sidebarClasses.root}
        sx={{
          position: "fixed",
          zIndex: 1101,
          left: 0,
          display: "none",
          flexDirection: "column",
          height: 1,
          mt: theme.spacing(1),
          bgcolor: theme.vars.palette.background.default,
          transition: theme.transitions.create(["width"], {
            easing: `var(${sidebarTokens.easing})`,
            duration: `var(${sidebarTokens.duration})`,
          }),
          [theme.breakpoints.down("sm")]: {
            [`& .${miniNavClasses.root}`]: {
              display: "none",
            },
          },
          [theme.breakpoints.up("sm")]: {
            top: `var(${headerTokens.upSmHeight})`,
            display: "flex",
            width: `var(${sidebarTokens.upSmWidth})`,
            px: theme.spacing(0.5),
          },

          [theme.breakpoints.down("lg")]: {
            [`& .${navClasses.root}`]: {
              display: "none",
            },
          },
          [theme.breakpoints.up("lg")]: {
            width: `var(${sidebarTokens.upLgWidth})`,
            px: theme.spacing(2),
            [`& .${miniNavClasses.root}`]: {
              display: "none",
            },
          },
        }}
      >
        {slots.miniNav}
        {slots.nav}
      </Box>
    </>
  );
}
