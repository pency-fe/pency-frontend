"use client";

import { CircularProgress, Stack, Typography } from "@mui/material";
import { useVerify } from "_core/auth/provision-user";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function VerifyPage() {
  const router = useRouter();
  const { mutate } = useVerify();
  const token = useSearchParams().get("token");

  if (token === null || !token.length) {
    router.push("/signup/email/not-verify");
    return;
  }

  useEffect(() => {
    mutate(
      { token },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (error) => {
          if (error.code === "EXPIRED_EMAIL_TOKEN") {
            router.push("/signup/email/not-verify");
          }
        },
      },
    );
  }, []);

  return (
    <Stack spacing={4} alignItems="center">
      <Typography>이메일 인증을 확인하고 있어요.</Typography>
      <CircularProgress />
    </Stack>
  );
}
