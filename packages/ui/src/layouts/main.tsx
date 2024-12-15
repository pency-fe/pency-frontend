"use client";

import { Container, ContainerProps, useTheme } from "@mui/material";
import { useMemo } from "react";
import { headerTokens } from "./header";

type Props = ContainerProps & { variant?: "compact" | "simple" };

export function Main({ variant = "simple", ...rest }: Props) {
  const theme = useTheme();

  const maxWidth = useMemo(() => {
    if (variant === "compact") {
      return "448px";
    }
    return "748px";
  }, [variant]);

  return (
    <Container
      {...rest}
      component="main"
      sx={{
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        maxWidth: maxWidth,
        pt: theme.spacing(1),
        pb: theme.spacing(8),
        mt: `var(${headerTokens.height})`,
        [theme.breakpoints.up("lg")]: { maxWidth: maxWidth, mt: `var(${headerTokens.upSmHeight})` },
        ...rest.sx,
      }}
    />
  );
}
