"use client";

import { AppBar, AppBarProps, Box, Container, GlobalStyles, Toolbar, useTheme } from "@mui/material";
import { forwardRef, PropsWithoutRef } from "react";

const token = {
  height: "--layout-header-height",
  upSmHeight: "--layout-header-up-sm-height",
};

type HeaderFnProps = PropsWithoutRef<AppBarProps> & {
  slots?: {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
  };
};

const HeaderFn = forwardRef<HTMLHeadElement, HeaderFnProps>(({ slots }, ref) => {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            [token.height]: "52px",
            [token.upSmHeight]: "56px",
          },
        }}
      />
      <AppBar ref={ref}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: "auto",
            height: `var(${token.height})`,
            transition: theme.transitions.create(["height"], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
            bgcolor: theme.vars.palette.background.default,

            [theme.breakpoints.up("sm")]: {
              minHeight: "auto",
              height: `var(${token.upSmHeight})`,
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

export const Header = Object.assign(HeaderFn, { token });
