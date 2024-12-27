"use client";

import { Box, Button, Link, Stack, useTheme } from "@mui/material";
import { BrandPencyTextLogoIcon, SolarInfoCircleBoldIcon } from "@pency/ui/components";
import NextLink from "next/link";

// https://www.postype.com/studio/eqweqwe21/dashboard
export function AccessDeniedView() {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        px: "20px",
        pb: "40px",
        [theme.breakpoints.up("sm")]: { pt: "15px", px: "50px", pb: "70px" },
      }}
    >
      <Box component={NextLink} href="/" sx={{ position: "absolute", top: 30 }}>
        <BrandPencyTextLogoIcon sx={{ width: "fit-content", height: "24px" }} />
      </Box>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <SolarInfoCircleBoldIcon sx={{ fontSize: 80 }} />
        <Box component="span" sx={{ fontSize: "16px", mt: "20px", mb: "28px" }}>
          권한이 없어요
        </Box>
        <Button LinkComponent={NextLink} href="/" variant="contained">
          펜시 홈으로 가기
        </Button>
      </Stack>
    </Stack>
  );
}
