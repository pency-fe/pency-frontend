"use client";

import { Box, Container, GlobalStyles, useMediaQuery, useTheme } from "@mui/material";
import { MiniNav, Nav } from "@/components";
import { Header } from "./header";

// ----------------------------------------------------------------------

const token = {
  easing: "--layout-sidebar-easing",
  duration: "--layout-sidebar-duration",
  upSmWidth: "--layout-sidebar-up-sm-width",
  upLgWidth: "--layout-sidebar-up-lg-width",
};

// ----------------------------------------------------------------------

type SidebarFnProps = {
  // data: Parameters<typeof Nav>[0]["data"];
  slots: {
    nav: React.ReactElement;
  };
};

function SidebarFn({ slots }: SidebarFnProps) {
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
        {/* {isSmUp && !isLgUp && <MiniNav data={data} />} */}
        {isLgUp && slots.nav}
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

type MainFnProps = {
  slots?: {
    footer?: React.ReactNode;
  };
  children?: React.ReactNode;
};

const MainFn = ({ slots, children }: MainFnProps) => {
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
          easing: `var(${token.easing})`,
          duration: `var(${token.duration})`,
        }),
        [theme.breakpoints.up("sm")]: {
          pl: `var(${token.upSmWidth})`,
        },
        [theme.breakpoints.up("lg")]: {
          pl: `var(${token.upLgWidth})`,
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

export const Sidebar = Object.assign(SidebarFn, { Main: MainFn, token });
