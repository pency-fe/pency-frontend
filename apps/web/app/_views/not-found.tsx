// https://www.postype.com/studio/eqweqwe211/dashboard

import { Stack, Typography, Button } from "@mui/material";
import { SolarInfoCircleBoldIcon } from "@pency/ui/components";

export function NotFound() {
  return (
    <Stack sx={{ justifyContent: "space-around", alignItems: "center", height: "100vh" }}>
      <SolarInfoCircleBoldIcon sx={{ fontSize: 120 }} />
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <SolarInfoCircleBoldIcon sx={{ fontSize: 80 }} />
        <Typography variant="h3">앗, 존재하지 않는 길이에요.</Typography>
        <Typography>죄송하지만 주소가 바뀌거나 사라진 것 같아요.</Typography>
        <Typography>정확한 주소인지 다시 한번 확인해 주세요.</Typography>
        <Button variant="contained">이전 페이지로 가기</Button>
      </Stack>
      <Button variant="outlined">펜시 홈으로 가기</Button>
    </Stack>
  );
}
