"use client";

import { Box, Container, ContainerProps, useTheme } from "@mui/material";
import { Header } from "../header";

type Props = {
  slots: {
    header: React.ReactElement;
  };
  slotProps?: {
    container?: ContainerProps;
  };
  children?: React.ReactNode;
};

export function Layout({ slots, slotProps, children }: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        minHeight: 1,
      }}
    >
      {slots.header}

      <Container
        {...slotProps?.container}
        component="main"
        sx={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          maxWidth: "448px",
          pt: theme.spacing(1),
          mt: `var(${Header.token.height})`,
          [theme.breakpoints.up("lg")]: { maxWidth: "448px", mt: `var(${Header.token.upSmHeight})` },
          ...slotProps?.container?.sx,
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
