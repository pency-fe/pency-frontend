"use client";

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";

export function VerifyPage() {
  const theme = useTheme();

  return (
    <Box>
      <Stack spacing={4}>
        <Typography variant="h4">이메일 인증 완료</Typography>
        <Stack spacing={3}>
          <Typography variant="body2" color={theme.vars.palette.text.secondary}>
            이메일 인증이 완료됐어요.
          </Typography>

          <Button type="submit" variant="soft" color="primary" size="large" fullWidth>
            펜시 홈으로 가기
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
