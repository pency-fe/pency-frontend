"use client";

import { CircularProgress, Stack, Typography } from "@mui/material";
import { isClient } from "@pency/util";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useVerifyEmail } from "../../model/use-verify-email";

export function EmailVerifyPage() {
  const router = useRouter();
  const { mutate } = useVerifyEmail();
  const idParam = useSearchParams().get("id");
  const token = useSearchParams().get("token");

  if (idParam === null || isNaN(Number(idParam)) || token === null || !token.length) {
    if (isClient()) {
      router.push("/signup/email/not-verify");
      return;
    } else {
      redirect("/signup/email/not-verify");
    }
  }

  const id = useMemo(() => Number(idParam), [idParam]);

  useEffect(() => {
    mutate(
      { id, token },
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
