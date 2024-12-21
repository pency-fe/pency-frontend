import { Button, Stack, Typography } from "@mui/material";
import { BrandPencyTextLogoIcon, SolarInfoCircleBoldIcon } from "@pency/ui/components";

// https://www.postype.com/studio/eqweqwe21/dashboard
export function AccessDenied() {
  return (
    <Stack sx={{ justifyContent: "space-around", alignItems: "center", height: "100vh" }}>
      <BrandPencyTextLogoIcon sx={{ fontSize: 120 }} />
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <SolarInfoCircleBoldIcon sx={{ fontSize: 80 }} />
        <Typography>권한이 없어요.</Typography>
        <Button variant="contained">펜시 홈으로 가기</Button>
      </Stack>
      <Button variant="outlined">이전 페이지로 가기</Button>
    </Stack>
  );
}
