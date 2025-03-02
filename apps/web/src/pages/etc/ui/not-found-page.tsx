"use client";

import { Stack, Button, useTheme, Box, Link } from "@mui/material";
import { BrandPencyTextLogoIcon, SolarInfoCircleBoldIcon } from "@pency/ui/components";
import NextLink from "next/link";

// https://www.postype.com/studio/eqweqwe211/dashboard
// https://tossinvest.com/news/12312/413/21/31/4/123/
export function NotFoundPage() {
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
      <Stack sx={{ alignItems: "center" }}>
        <SolarInfoCircleBoldIcon sx={{ fontSize: 80 }} />

        <Stack sx={{ alignItems: "center", mt: "20px", mb: "28px" }}>
          <Box component="span" sx={{ fontSize: "26px", fontWeight: 700, mb: "8px" }}>
            페이지를 찾지 못했어요
          </Box>

          <Box component="span" sx={{ fontSize: "16px", color: theme.vars.palette.text.secondary }}>
            주소가 정확한지 확인해주세요
          </Box>
        </Stack>
        <Button
          variant="soft"
          size="medium"
          color="primary"
          onClick={() => {
            window.history.back();
          }}
        >
          이전 페이지로 가기
        </Button>
      </Stack>
    </Stack>
  );
}
