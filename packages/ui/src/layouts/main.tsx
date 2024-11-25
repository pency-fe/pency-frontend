"use client";

import { Container, ContainerProps, useTheme } from "@mui/material";
import { Header } from "./header";

type Props = ContainerProps;

export function Main(props: Props) {
  const theme = useTheme();

  return (
    <Container
      {...props}
      component="main"
      sx={{
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        maxWidth: "448px",
        pt: theme.spacing(1),
        mt: `var(${Header.token.height})`,
        [theme.breakpoints.up("sm")]: {
          px: 0,
        },
        [theme.breakpoints.up("lg")]: { maxWidth: "448px", mt: `var(${Header.token.upSmHeight})` },
        ...props.sx,
      }}
    />
  );
}
