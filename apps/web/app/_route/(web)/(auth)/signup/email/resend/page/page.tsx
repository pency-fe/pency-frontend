"use client";
import { Stack, Typography, TextField, Button, useTheme, Skeleton } from "@mui/material";
import { toast } from "@pency/ui/components";
import { useQuery } from "@tanstack/react-query";
import { authProvisionUserKeys, useResend } from "_core/auth/provision-user";
import { useRouter, useSearchParams } from "next/navigation";

export function ResendPage() {
  const theme = useTheme();
  const router = useRouter();
  const { mutate } = useResend();
  const provisionUserId = useSearchParams().get("provisionUserId");

  if (provisionUserId === null || !provisionUserId.length) {
    router.push("/");
    return;
  }

  const query = useQuery(authProvisionUserKeys.email({ provisionUserId }));

  if (query.isError && query.error.code === "EXPIRED_EMAIL_TOKEN") {
    router.push("/signup/email/not-verify");
    return;
  }

  const handleResendClick = (data: { provisionUserId: string }) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("인증 메일을 재전송했어요.");
      },
      onError: (error) => {
        if (error.code === "EXPIRED_EMAIL_TOKEN") {
          router.push("/signup/email/not-verify");
        }

        if (error.code === "EXCEEDED_EMAIL_SEND") {
          toast.warning("이미 메일을 전송했어요. 1분에 한번만 가능해요.");
        }
      },
    });
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h4">이메일 인증</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        noValidate
      >
        <Stack spacing={4}>
          <Typography variant="body2" color={theme.vars.palette.text.secondary}>
            등록한 이메일 주소로 인증 메일을 보내드렸어요. 24시간 안에 링크를 열어 이메일 인증을 완료해주세요.
          </Typography>

          <Typography variant="body2" color={theme.vars.palette.text.secondary}>
            인증 메일을 받지 못했을 경우, '인증 메일 재전송' 버튼을 눌러주세요.
          </Typography>

          {query.isPending ? (
            <>
              <Skeleton animation="wave" height={54} />
              <Skeleton animation="wave" height={48} />
            </>
          ) : (
            <>
              <TextField variant="filled" fullWidth type="email" label="이메일" value={query.data?.email} disabled />

              <Button
                type="submit"
                variant="soft"
                color="primary"
                size="large"
                fullWidth
                onClick={() => {
                  handleResendClick({ provisionUserId });
                }}
              >
                인증 메일 재전송
              </Button>
            </>
          )}
        </Stack>
      </form>
    </Stack>
  );
}
