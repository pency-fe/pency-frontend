"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Checkbox, Divider, FormControlLabel, Link, Stack, Typography, useTheme } from "@mui/material";
import { BrandAppleIcon, BrandGoogleIcon, BrandNaverIcon, IcOutlineEmailIcon } from "@pency/ui/components";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  age: z.boolean().refine((age) => age === true),
});

type Schema = z.infer<typeof schema>;

export default function Page() {
  const { control, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      age: false,
    },
    mode: "onTouched",
  });

  const router = useRouter();

  const onSubmit = (provider?: "google" | "apple" | "naver") => {
    switch (provider) {
      case "google":
        // google.com
        break;
      case "apple":
        break;
      case "naver":
        break;
      default:
        router.push("/signup/email");
    }
  };

  const theme = useTheme();

  return (
    <Box>
      <Stack spacing={4}>
        <Typography variant="h4">펜시 회원가입</Typography>
        <form noValidate>
          <Stack spacing={2.5}>
            <Stack spacing={1}>
              <Button variant="soft" startIcon={<BrandGoogleIcon onClick={handleSubmit(() => onSubmit("google"))} />}>
                구글 회원가입
              </Button>

              <Button variant="soft" startIcon={<BrandAppleIcon />} onClick={handleSubmit(() => onSubmit("apple"))}>
                애플 회원가입
              </Button>

              <Button variant="soft" startIcon={<BrandNaverIcon />} onClick={handleSubmit(() => onSubmit("naver"))}>
                네이버 회원가입
              </Button>

              <Button variant="soft" startIcon={<IcOutlineEmailIcon />} onClick={handleSubmit(() => onSubmit())}>
                이메일 회원가입
              </Button>
            </Stack>

            <Stack spacing={1.5}>
              <Controller
                control={control}
                name="age"
                render={({ field, fieldState: { error } }) => (
                  <FormControlLabel
                    label="만 14세 이상입니다."
                    control={<Checkbox {...field} checked={field.value} color={error ? "error" : "primary"} />}
                  />
                )}
              />
              <Divider />
              <Stack direction="row" spacing={1}>
                <Link href="/login" variant="subtitle2">
                  로그인
                </Link>
                <Typography variant="subtitle2" color={theme.vars.palette.text.secondary}>
                  ·
                </Typography>
                <Link href="/account/find" variant="subtitle2">
                  계정 찾기
                </Link>
              </Stack>
              <Divider />
              <Typography variant="subtitle2" color={theme.vars.palette.text.secondary}>
                SNS로 로그인 및 회원가입 시 펜시의{" "}
                <Link href="/terms" target="_blank" variant="subtitle2" underline="always" color="inherit">
                  이용약관
                </Link>
                {"과 "}
                <Link href="/privacy" target="_blank" variant="subtitle2" underline="always" color="inherit">
                  개인정보 수집 및 이용
                </Link>
                에 동의한 것으로 간주합니다.
              </Typography>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
