"use client";

import { Box, GlobalStyles, useTheme } from "@mui/material";
import { Header } from "./header";
import { miniNavClasses, navClasses } from "@/components";

// ----------------------------------------------------------------------

const token = {
  easing: "--layout-sidebar-easing",
  duration: "--layout-sidebar-duration",
  upSmWidth: "--layout-sidebar-up-sm-width",
  upLgWidth: "--layout-sidebar-up-lg-width",
};

// ----------------------------------------------------------------------

type SidebarFnProps = {
  slots: {
    nav: React.ReactElement;
    miniNav: React.ReactElement;
  };
};

function SidebarFn({ slots }: SidebarFnProps) {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            [token.easing]: "linear",
            [token.duration]: "120ms",
            [token.upSmWidth]: "88px",
            [token.upLgWidth]: "300px",
          },
        }}
      />
      <Box
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
            easing: `var(${token.easing})`,
            duration: `var(${token.duration})`,
          }),
          [theme.breakpoints.down("sm")]: {
            [`& .${miniNavClasses.root}`]: {
              display: "none",
            },
          },
          [theme.breakpoints.up("sm")]: {
            top: `var(${Header.token.upSmHeight})`,
            display: "flex",
            width: `var(${token.upSmWidth})`,
            px: theme.spacing(0.5),
          },

          [theme.breakpoints.down("lg")]: {
            [`& .${navClasses.root}`]: {
              display: "none",
            },
          },
          [theme.breakpoints.up("lg")]: {
            width: `var(${token.upLgWidth})`,
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

export const Sidebar = Object.assign(SidebarFn, { token });
