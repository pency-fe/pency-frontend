"use client";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { useEmail, useResend } from "_core/auth";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export function ResendPage() {
  return (
    <Box>
      <Stack spacing={4}>
        <Typography variant="h4">이메일 인증</Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={4}>
            <TextField variant="filled" fullWidth type="email" label="이메일" value={email} disabled />

            <Button type="submit" variant="soft" color="primary" size="large" fullWidth>
              인증 메일 재전송
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
