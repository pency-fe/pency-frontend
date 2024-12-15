"use client";

import { AppBar, AppBarProps, Box, Container, GlobalStyles, Toolbar, useTheme } from "@mui/material";
import { forwardRef, PropsWithoutRef } from "react";

export const headerTokens = {
  height: "--layout-header-height",
  upSmHeight: "--layout-header-up-sm-height",
};

type HeaderProps = PropsWithoutRef<AppBarProps> & {
  slots?: {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
  };
};

export const Header = forwardRef<HTMLHeadElement, HeaderProps>(({ slots }, ref) => {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            [headerTokens.height]: "52px",
            [headerTokens.upSmHeight]: "56px",
          },
        }}
      />
      <AppBar ref={ref}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: "auto",
            height: `var(${headerTokens.height})`,
            transition: theme.transitions.create(["height"], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
            bgcolor: theme.vars.palette.background.default,

            [theme.breakpoints.up("sm")]: {
              minHeight: "auto",
              height: `var(${headerTokens.upSmHeight})`,
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
