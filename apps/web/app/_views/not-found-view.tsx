"use client";

import { Stack, Typography, Button, useTheme } from "@mui/material";
import { BrandPencyTextLogoIcon, SolarInfoCircleBoldIcon } from "@pency/ui/components";

// https://www.postype.com/studio/eqweqwe211/dashboard
// https://tossinvest.com/news/12312/413/21/31/4/123/
export function NotFoundView() {
  const theme = useTheme();

  return (
    <Stack sx={{ justifyContent: "space-around", alignItems: "center", height: "100vh" }}>
      <BrandPencyTextLogoIcon sx={{ width: "fit-content", height: "24px" }} />
      <Stack sx={{ alignItems: "center" }}>
        <SolarInfoCircleBoldIcon sx={{ width: "80px", height: "80px" }} />

        <Typography variant="h4" sx={{ mt: 2 }}>
          페이지를 찾지 못했어요
        </Typography>

        <Typography variant="body2">페이지 주소가 정확한지 확인해주세요</Typography>

        <Button variant="soft" color="primary">
          이전 페이지로 가기
        </Button>
      </Stack>
      <Button variant="outlined">홈으로 가기</Button>
    </Stack>
  );
}
