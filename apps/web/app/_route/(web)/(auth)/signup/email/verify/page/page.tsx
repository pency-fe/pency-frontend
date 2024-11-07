"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField, Typography, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, "이메일 주소를 입력해 주세요.").email("이메일 주소를 정확하게 입력해 주세요."),
});
type Schema = z.infer<typeof schema>;

export function VerifyPage() {
  const theme = useTheme();

  const { control, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  return (
    <Box>
      <Stack spacing={4}>
        <Typography variant="h4">이메일 인증</Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            <Typography variant="body2" color={theme.vars.palette.text.secondary}>
              등록한 이메일 주소로 인증 메일을 보내드렸어요. 24시간 안에 링크를 열어 이메일 인증을 완료해주세요.
            </Typography>

            <Typography variant="body2" color={theme.vars.palette.text.secondary}>
              인증 메일을 받지 못했을 경우, '인증 메일 재전송' 버튼을 눌러주세요.
            </Typography>

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

            <Button type="submit" variant="soft" color="primary" size="large" fullWidth>
              인증 메일 재전송
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
