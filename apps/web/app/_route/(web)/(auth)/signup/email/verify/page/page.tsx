"use client";

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { toast } from "@pency/ui/components";
import { useVerify } from "_core/auth/provision-user";
import { useRouter, useSearchParams } from "next/navigation";

export function VerifyPage() {
  const theme = useTheme();

  const router = useRouter();
  const token = useSearchParams().get("token");
  const { mutate } = useVerify();

  if (token === null || !token.length) {
    router.replace("/signup/email/not-verify");
    return;
  }

  const handleHomeClick = (data: { token: string }) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (error) => {
        if (error.code === "EXPIRED_EMAIL_TOKEN") {
          toast.error(error.message);
          return;
        }
      },
    });
  };

  return (
    <Box>
      <Stack spacing={4}>
        <Typography variant="h4">이메일 인증 완료</Typography>
        <Stack spacing={3}>
          <Typography variant="body2" color={theme.vars.palette.text.secondary}>
            이메일 인증이 완료됐어요.
          </Typography>

          <Button
            variant="soft"
            color="primary"
            size="large"
            fullWidth
            onClick={() => {
              handleHomeClick({ token });
            }}
          >
            펜시 홈으로 가기
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
