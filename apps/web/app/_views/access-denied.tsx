import { Box, Button, Stack, Typography } from "@mui/material";
import { SolarInfoCircleBoldIcon } from "@pency/ui/components";
import { LazyLoadImage } from "react-lazy-load-image-component";

// https://www.postype.com/studio/eqweqwe21/dashboard
export function AccessDenied() {
  return (
    <Stack sx={{ justifyContent: "space-around", alignItems: "center", height: "100vh" }}>
      <Box component={LazyLoadImage} src={process.env["NEXT_PUBLIC_LOGO"]} width={80} />
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <SolarInfoCircleBoldIcon sx={{ fontSize: 80 }} />
        <Typography>권한이 없어요.</Typography>
        <Button variant="contained">펜시 홈으로 가기</Button>
      </Stack>
      <Button variant="outlined">이전 페이지로 가기</Button>
    </Stack>
  );
}
