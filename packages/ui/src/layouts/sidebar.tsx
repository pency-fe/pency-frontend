"use client";

import { Box, GlobalStyles, useMediaQuery, useTheme } from "@mui/material";
import { MiniNav, Nav } from "@/components";
import { Header } from "./header";

const token = {
  easing: "--layout-sidebar-easing",
  duration: "--layout-sidebar-duration",
  upSmWidth: "--layout-sidebar-up-sm-width",
  upLgWidth: "--layout-sidebar-up-lg-width",
};

type SidebarFnProps = {
  data: Parameters<typeof Nav>[0]["data"];
  slots: {
    nav: React.ReactElement;
  };
};

function SidebarFn({ data, slots }: SidebarFnProps) {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

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
          [theme.breakpoints.up("sm")]: {
            top: `var(${Header.token.upSmHeight})`,
            display: "flex",
            width: `var(${token.upSmWidth})`,
            px: theme.spacing(0.5),
          },
          [theme.breakpoints.up("lg")]: {
            width: `var(${token.upLgWidth})`,
            px: theme.spacing(2),
          },
        }}
      >
        {isSmUp && !isLgUp && <MiniNav data={data} />}
        {isLgUp && slots.nav}
      </Box>
    </>
  );
}

export const Sidebar = Object.assign(SidebarFn, { token });
