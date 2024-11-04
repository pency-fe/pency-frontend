"use client";

import { Box, Button, Divider, Link, Stack, Typography, useTheme } from "@mui/material";
import { BrandAppleIcon, BrandGoogleIcon, BrandNaverIcon, IcOutlineEmailIcon } from "@pency/ui/components";
import { useRouter } from "next/navigation";

export default function Page() {
  const theme = useTheme();
  const router = useRouter();

  // [TODO]
  const handleLoginClick = (e) => {
    e.preventDefault();

    if (e.target.href.startsWith("http://localhost:")) {
      router.push(e.target.href);
    } else {
      window.open(e.target.href);
    }
  };

  return (
    <Box>
      <Stack spacing={4}>
        <Typography variant="h4">펜시 로그인</Typography>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Button
              href="https://www.google.co.kr/"
              variant="soft"
              startIcon={<BrandGoogleIcon />}
              onClick={handleLoginClick}
            >
              구글 로그인
            </Button>

            <Button
              href="https://www.apple.com/kr/store?afid=p238%7CsiADh6hbK-dc_mtid_18707vxu38484_pcrid_719546863096_pgrid_16348496961_pntwk_g_pchan__pexid__ptid_kwd-304236833465_&cid=aos-kr-kwgo-Brand--slid---product-"
              variant="soft"
              startIcon={<BrandAppleIcon />}
              onClick={handleLoginClick}
            >
              애플 로그인
            </Button>

            <Button
              href="https://www.naver.com/"
              variant="soft"
              startIcon={<BrandNaverIcon />}
              onClick={handleLoginClick}
            >
              네이버 로그인
            </Button>

            <Button href="/login" variant="soft" startIcon={<IcOutlineEmailIcon />} onClick={handleLoginClick}>
              이메일 로그인
            </Button>
          </Stack>

          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1}>
              <Link href="/account/find" variant="subtitle2">
                계정 찾기
              </Link>
              <Typography variant="subtitle2" color={theme.vars.palette.text.secondary}>
                ·
              </Typography>
              <Link href="/TODO" variant="subtitle2">
                비밀번호 재설정
              </Link>
              <Typography variant="subtitle2" color={theme.vars.palette.text.secondary}>
                ·
              </Typography>
              <Link href="/signup" variant="subtitle2">
                회원가입
              </Link>
            </Stack>
            <Divider />
            <Typography variant="subtitle2" color={theme.vars.palette.text.secondary}>
              SNS로 로그인 및 로그인 시 펜시의{" "}
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
