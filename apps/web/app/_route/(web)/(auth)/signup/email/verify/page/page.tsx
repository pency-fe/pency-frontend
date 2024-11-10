"use client";

import { CircularProgress, Stack, Typography } from "@mui/material";
import { toast } from "@pency/ui/components";
import { useVerify } from "_core/auth/provision-user";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function VerifyPage() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const { mutate } = useVerify();

  if (token === null || !token.length) {
    router.replace("/signup/email/not-verify");
    return;
  }

  const mutation = (data: { token: string }) => {
    mutate(data, {
      onSuccess: () => {
        router.replace("/");
        toast.success("인증을 완료했어요.");
      },
      onError: (error) => {
        if (error.code === "EXPIRED_EMAIL_TOKEN") {
          router.replace("/signup/email/not-verify");
          return;
        }
      },
    });
  };

  useEffect(() => {
    mutation({ token });
  }, []);

  return (
    <Stack spacing={4} alignItems="center">
      <Typography>이메일 인증을 확인하고 있어요.</Typography>
      <CircularProgress />
    </Stack>
  );
}
