"use client";

import { Box, BoxProps, Dialog, Divider, useTheme } from "@mui/material";

const HeaderFn = (props: BoxProps) => {
  const theme = useTheme();

  return (
    <>
      <Box
        {...props}
        sx={{
          display: "flex",
          alignItems: "center",
          height: "52px",
          px: "16px",
          [theme.breakpoints.up("sm")]: { height: "56px", px: "20px" },
          ...props.sx,
        }}
      />
      <Divider />
    </>
  );
};

const BodyFn = (props: BoxProps) => {
  const theme = useTheme();
  return (
    <Box
      {...props}
      sx={{
        flex: 1,
        overflowY: "auto",
        px: "16px",
        [theme.breakpoints.up("sm")]: { px: "20px" },
        ...props.sx,
      }}
    />
  );
};

const FooterFn = (props: BoxProps) => {
  const theme = useTheme();

  return (
    <>
      <Divider />
      <Box
        {...props}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          px: "16px",
          py: "12px",
          [theme.breakpoints.up("sm")]: { px: "20px" },
          ...props.sx,
        }}
      />
    </>
  );
};

export const FormDialog = Object.assign(Dialog, {
  Header: HeaderFn,
  Body: BodyFn,
  Footer: FooterFn,
});
