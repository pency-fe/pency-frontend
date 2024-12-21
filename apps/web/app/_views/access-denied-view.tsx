import { Box, Button, Stack, useTheme } from "@mui/material";
import { BrandPencyTextLogoIcon, SolarInfoCircleBoldIcon } from "@pency/ui/components";

// https://www.postype.com/studio/eqweqwe21/dashboard
export function AccessDenied() {
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
      <BrandPencyTextLogoIcon sx={{ position: "absolute", top: 30, width: "fit-content", height: "24px" }} />
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <SolarInfoCircleBoldIcon sx={{ fontSize: 80 }} />
        <Box component="span" sx={{ fontSize: "16px", mt: "24px", mb: "32px" }}>
          권한이 없어요.
        </Box>
        <Button variant="contained">펜시 홈으로 가기</Button>
      </Stack>
    </Stack>
  );
}
