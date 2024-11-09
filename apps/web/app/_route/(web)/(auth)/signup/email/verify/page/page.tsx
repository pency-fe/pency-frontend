"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

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
