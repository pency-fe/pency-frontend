"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, IconButton, InputAdornment, Link, Stack, TextField, Typography, useTheme } from "@mui/material";
import { EvaEyeFillIcon, EvaEyeOffFillIcon, toast } from "@pency/ui/components";
import { useBooleanState } from "@pency/util";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import NextLink from "next/link";
import { useLogin } from "_core/auth/user";
import { useRouter } from "next/navigation";

// ----------------------------------------------------------------------

const schema = z.object({
  email: z.string().min(1, "이메일 주소를 입력해 주세요.").email("이메일 주소를 정확하게 입력해 주세요."),
  password: z.string(),
});
type Schema = z.infer<typeof schema>;

// ----------------------------------------------------------------------

export function EmailPage() {
  const router = useRouter();

  const { mutate } = useLogin();

  const { control, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });
  const { bool: passwordShow, toggle: togglePasswordShow } = useBooleanState(false);

  const onSubmit = async (data: Schema) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/");
      },
      onError: async (error) => {
        if (error.code === "UNVERIFIED_EMAIL") {
          router.push(`/signup/email/resend?id=${error.data.id}`);
          return;
        }

        if (error.code === "INVALID_LOGIN") {
          toast.error("이메일 또는 비밀번호를 잘못 입력했어요.");
          return;
        }

        if (error.code === "BANNED_USER_BY_ADMIN") {
          toast.error("관리자에 의해 서비스 이용이 제한된 계정이에요.");
          return;
        }
      },
    });
  };

  const theme = useTheme();

  return (
    <Stack spacing={4}>
      <Typography variant="h4">이메일 로그인</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={1.5}>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                variant="filled"
                fullWidth
                type="email"
                label="이메일"
                helperText={error?.message}
                error={!!error}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                variant="filled"
                fullWidth
                type={passwordShow ? "text" : "password"}
                label="비밀번호"
                autoComplete="on"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordShow}>
                        {passwordShow ? <EvaEyeFillIcon /> : <EvaEyeOffFillIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Button type="submit" variant="soft" color="primary" size="large" fullWidth>
            로그인
          </Button>
        </Stack>
      </form>

      <Stack direction="row" spacing={1}>
        <Link component={NextLink} href="/account/find" variant="subtitle2">
          계정 찾기
        </Link>
        <Typography variant="subtitle2" color={theme.vars.palette.text.secondary}>
          ·
        </Typography>
        <Link component={NextLink} href="/TODO" variant="subtitle2">
          비밀번호 재설정
        </Link>
      </Stack>
    </Stack>
  );
}
