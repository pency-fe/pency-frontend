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

  const onSubmit = (data: Schema, action: string) => {
    console.log(data);
    router.push(`signup/${action}`);
  };

  const theme = useTheme();

  return (
    <Box>
      <Stack spacing={4}>
        <Typography variant="h4">펜시 회원가입</Typography>
        <form noValidate>
          <Stack spacing={2.5}>
            <Stack spacing={1}>
              <Button
                variant="soft"
                startIcon={
                  <BrandGoogleIcon
                    onClick={handleSubmit((data) => {
                      onSubmit(data, "google");
                    })}
                  />
                }
              >
                구글 회원가입
              </Button>

              <Button
                variant="soft"
                startIcon={<BrandAppleIcon />}
                onClick={handleSubmit((data) => {
                  onSubmit(data, "apple");
                })}
              >
                애플 회원가입
              </Button>

              <Button
                variant="soft"
                startIcon={<BrandNaverIcon />}
                onClick={handleSubmit((data) => {
                  onSubmit(data, "naver");
                })}
              >
                네이버 회원가입
              </Button>

              <Button
                variant="soft"
                startIcon={<IcOutlineEmailIcon />}
                onClick={handleSubmit((data) => {
                  onSubmit(data, "email");
                })}
              >
                이메일 회원가입
              </Button>
            </Stack>

            <Stack spacing={1.5}>
              <Box>
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
              </Box>
              <Divider />
              <Stack direction={"row"} spacing={1}>
                <Link href="/TODO" variant="subtitle2" color={theme.vars.palette.text.secondary}>
                  로그인
                </Link>
                <Typography variant="subtitle2" color={theme.vars.palette.text.secondary}>
                  ·
                </Typography>
                <Link href="/TODO" variant="subtitle2" color={theme.vars.palette.text.secondary}>
                  계정 찾기
                </Link>
              </Stack>
              <Divider />
              <Typography variant="subtitle2" color={theme.vars.palette.text.secondary}>
                SNS로 로그인 및 회원가입 시 펜시의{" "}
                <Link href="/terms" target="_blank" variant="subtitle2" underline="always">
                  이용약관
                </Link>
                {"과 "}
                <Link href="/privacy" target="_blank" variant="subtitle2" underline="always">
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
