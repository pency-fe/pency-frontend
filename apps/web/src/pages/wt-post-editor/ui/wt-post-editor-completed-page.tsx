"use client";

import NextLink from "next/link";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import {
  BrandPencyTextLogoIcon,
  BrandTwitterIcon,
  EvaLink2FillIcon,
  SolarCheckCircleLinearIcon,
} from "@pency/ui/components";
import { Main } from "@pency/ui/layouts";

export const WtPostEditorCompletedPage = () => {
  return (
    <Main
      variant="compact"
      sx={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box component={NextLink} href="/" sx={{ position: "absolute", top: 30 }}>
        <BrandPencyTextLogoIcon sx={{ width: "fit-content", height: "24px" }} />
      </Box>
      <SolarCheckCircleLinearIcon sx={{ mb: "20px", width: 60, height: 60 }} />
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 600,
          mb: "24px",
        }}
      >
        포스트를 발행했어요!
      </Typography>
      <Stack spacing="16px" sx={{ alignItems: "center", width: "100%" }}>
        <Stack spacing="6px" sx={{ width: "100%" }}>
          <Button variant="soft" fullWidth startIcon={<EvaLink2FillIcon />}>
            링크 복사하기
          </Button>
          <Button variant="soft" fullWidth startIcon={<BrandTwitterIcon />}>
            트위터에 공유하기
          </Button>
        </Stack>
        <Divider sx={{ width: "100%" }} />
        <Button variant="contained" fullWidth>
          발행한 포스트 보기
        </Button>
      </Stack>
    </Main>
  );
};
