"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, IconButton, InputAdornment, Link, Stack, TextField, Typography, useTheme } from "@mui/material";
import { EvaEyeFillIcon, EvaEyeOffFillIcon } from "@pency/ui/components";
import { useBooleanState } from "@pency/util";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import NextLink from "next/link";

const schema = z.object({
  email: z.string().min(1, "이메일 주소를 입력해 주세요.").email("이메일 주소를 정확하게 입력해 주세요."),
  password: z.string(),
});
type Schema = z.infer<typeof schema>;

export function EmailPage() {
  const { control, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });
  const { bool: passwordShow, toggle: togglePasswordShow } = useBooleanState(false);

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  const theme = useTheme();

  return (
    <Box>
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
              회원가입
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
    </Box>
  );
}
