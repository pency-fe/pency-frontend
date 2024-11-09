"use client";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { authProvisionUserKeys, useResend } from "_core/auth/provision-user";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// [TODO]
// 0. 회원가입 다시하셈
// 1. SuccessRes 사라졌음. -> 이제 그냥 응답으로 데이터만 보내줄거임. 없으면 안보내주고. api-doc 최신화 했음. api확인하면 됌
// 2. HTTPError가 QueryError로 바뀌었음. _core/api.ts 확인 후 mutations보면됌
// 3. "EXPIRED_EMAIL_TOKEN" 코드 에러는 그냥 not-verify로 이동시켜버림
// 흠.. Suspense, ErrorBoundary, useSuspense를 사용하면 더 깔끔해 질 것 같지만, 이 페이지에서는 코드 줄수가 적기 때문에 안써도 될 것 같음
export function ResendPage() {
  const [message, setMessage] = useState("");
  const provisionUserId = useSearchParams().get("provisionUserId");
  const router = useRouter();
  const { mutate } = useResend();

  if (provisionUserId === null || !provisionUserId.length) {
    router.replace("/");
    return;
  }

  const query = useQuery(authProvisionUserKeys.email({ provisionUserId }));

  if (query.isError && query.error.code === "EXPIRED_EMAIL_TOKEN") {
    router.replace("/signup/email/not-verify");
    return;
  }

  const handleResendClick = (data: { provisionUserId: string }) => {
    mutate(data, {
      onSuccess: () => {
        setMessage("인증 메일이 재전송됐어요. 메일을 확인해주세요.");
      },
      onError: (error) => {
        if (error.code === "EXCEEDED_EMAIL_SEND") {
          setMessage(error.message);
        }

        if (error.code === "EXPIRED_EMAIL_TOKEN") {
          setMessage(error.message);
        }
      },
    });
  };

  // useEffect(() => {
  //   if (provisionUserId === null || !provisionUserId.length) {
  //     router.replace("/");
  //   }
  // }, [provisionUserId, router]);

  return (
    <Box>
      <Stack spacing={4}>
        <Typography variant="h4">이메일 인증</Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          noValidate
        >
          <Stack spacing={4}>
            {query.isPending ? (
              <>Loading~~</>
            ) : (
              <>
                <TextField variant="filled" fullWidth type="email" label="이메일" value={query.data?.email} disabled />

                {message && <Typography>{message}</Typography>}

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
    </Box>
  );
}
