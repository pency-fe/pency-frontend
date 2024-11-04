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
        window.open("https://www.google.co.kr/");
        break;
      case "apple":
        window.open(
          "https://www.apple.com/kr/store?afid=p238%7CsiADh6hbK-dc_mtid_18707vxu38484_pcrid_719546863096_pgrid_16348496961_pntwk_g_pchan__pexid__ptid_kwd-304236833465_&cid=aos-kr-kwgo-Brand--slid---product-",
        );
        break;
      case "naver":
        window.open("https://www.naver.com/");
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
        <Stack spacing={1}>
          <form noValidate>
            <Stack spacing={1}>
              <Button variant="soft" startIcon={<BrandGoogleIcon />} onClick={handleSubmit(() => onSubmit("google"))}>
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
            </Stack>
          </form>
          <Stack spacing={1.5}>
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
      </Stack>
    </Box>
  );
}
