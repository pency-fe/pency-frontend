"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { EvaEyeFillIcon, EvaEyeOffFillIcon } from "@pency/ui/components";
import { useToggle } from "@pency/util";
import { useSignupWithEmail } from "_core/provision-user";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import NextLink from "next/link";

const schema = z.object({
  email: z.string().min(1, "이메일 주소를 입력해 주세요.").email("이메일 주소를 정확하게 입력해 주세요."),
  password: z
    .string()
    .min(1, "비밀번호를 입력해 주세요.")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
      "비밀번호는 영문, 숫자, 특수문자를 모두 포함하여 공백 없이 8~20자로 입력해 주세요.",
    ),
  terms: z.boolean().refine((terms) => terms === true),
  privacy: z.boolean().refine((terms) => terms === true),
});

type Schema = z.infer<typeof schema>;

export function EmailPage() {
  const { control, handleSubmit, setError } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      terms: false,
      privacy: false,
    },
    mode: "onTouched",
  });
  const [passwordShow, togglePasswordShow] = useToggle(false);
  const { mutate } = useSignupWithEmail();
  const router = useRouter();

  const onSubmit = async (data: Schema) => {
    mutate(data, {
      onSuccess: (data) => {
        router.push(`/signup/email/resend?id=${data.id}`);
      },
      onError: async (error) => {
        if (error.code === "DUPLICATE_EMAIL") {
          setError("email", {
            message: "다른 계정에서 사용 중인 이메일 주소예요.",
          });
        }
      },
    });
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h4">이메일 회원가입</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={4}>
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
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  variant="filled"
                  fullWidth
                  type={passwordShow ? "text" : "password"}
                  label="비밀번호"
                  autoComplete="on"
                  helperText={
                    error?.message ??
                    "비밀번호는 영문, 숫자, 특수문자를 모두 포함하여 공백 없이 8~20자로 입력해 주세요."
                  }
                  error={!!error}
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
          </Stack>

          <Stack>
            <Stack direction={"row"} gap={1} sx={{ alignItems: "center" }}>
              <Controller
                control={control}
                name="terms"
                render={({ field, fieldState: { error } }) => (
                  <FormControlLabel
                    label="서비스 약관에 동의합니다."
                    control={<Checkbox {...field} checked={field.value} color={error ? "error" : "primary"} />}
                  />
                )}
              />
              <Link component={NextLink} href="/terms" target="_blank" variant="body2" underline="always">
                내용보기
              </Link>
            </Stack>

            <Stack direction={"row"} gap={1} sx={{ alignItems: "center" }}>
              <Controller
                control={control}
                name="privacy"
                render={({ field, fieldState: { error } }) => (
                  <FormControlLabel
                    label="개인정보 수집 및 이용에 동의합니다."
                    control={<Checkbox {...field} checked={field.value} color={error ? "error" : "primary"} />}
                  />
                )}
              />

              <Link component={NextLink} href="/privacy" target="_blank" variant="body2" underline="always">
                내용보기
              </Link>
            </Stack>
          </Stack>

          <Button type="submit" variant="soft" color="primary" size="large" fullWidth>
            회원가입
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
