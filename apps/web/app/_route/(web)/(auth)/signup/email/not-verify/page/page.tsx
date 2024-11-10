"use client";

import { useTheme, Stack, Typography, Button } from "@mui/material";
import NextLink from "next/link";

export function NotVerifyPage() {
  const theme = useTheme();

  return (
    <Stack spacing={4}>
      <Typography variant="h4">이메일 인증 번호 만료</Typography>
      <Typography variant="body2" color={theme.vars.palette.text.secondary}>
        인증번호가 만료되어 이메일 인증에 실패했어요.
      </Typography>

      <Button LinkComponent={NextLink} href="/" variant="soft" color="primary" size="large" fullWidth>
        펜시 홈으로 가기
      </Button>
    </Stack>
  );
}
