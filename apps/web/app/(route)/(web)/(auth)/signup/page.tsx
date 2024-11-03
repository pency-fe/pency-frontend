"use client";

import { Box, Button, Checkbox, Divider, FormControlLabel, Stack, Typography, useTheme } from "@mui/material";
import { BrandAppleIcon, BrandGoogleIcon, BrandNaverIcon, IcOutlineEmailIcon } from "@pency/ui/components";
import React from "react";

const Signup = () => {
  const theme = useTheme();

  return (
    <Box>
      <Stack spacing={4}>
        <Typography variant="h4">펜시 회원가입</Typography>
        <Stack spacing={1}>
          <Button variant="soft" startIcon={<BrandGoogleIcon />}>
            구글 회원가입
          </Button>

          <Button variant="soft" startIcon={<BrandAppleIcon />}>
            애플 회원가입
          </Button>

          <Button variant="soft" startIcon={<BrandNaverIcon />}>
            네이버 회원가입
          </Button>

          <Button variant="soft" startIcon={<IcOutlineEmailIcon />}>
            이메일 회원가입
          </Button>
        </Stack>

        <Stack spacing={1.5}>
          <Box>
            <FormControlLabel
              control={<Checkbox />}
              label={<Typography variant="body2">만 14세 이상입니다.</Typography>}
            />
          </Box>
          <Divider />
          <Stack direction={"row"} spacing={1}>
            <Typography
              component="a"
              href="/TODO"
              variant="subtitle2"
              color={theme.vars.palette.text.secondary}
              sx={{ textDecoration: "none" }}
            >
              로그인
            </Typography>
            <Typography variant="subtitle2" color={theme.vars.palette.text.secondary}>
              ·
            </Typography>
            <Typography
              component="a"
              href="/TODO"
              variant="subtitle2"
              color={theme.vars.palette.text.secondary}
              sx={{ textDecoration: "none" }}
            >
              계정 찾기
            </Typography>
          </Stack>
          <Divider />
          <Typography variant="subtitle2" color={theme.vars.palette.text.secondary}>
            SNS로 로그인 및 회원가입 시 펜시의{" "}
            <Typography
              component="a"
              href="/TODO"
              target="_blank"
              variant="subtitle2"
              color={theme.vars.palette.text.secondary}
            >
              이용약관
            </Typography>
            {`과 `}
            <Typography
              component="a"
              href="/TODO"
              target="_blank"
              variant="subtitle2"
              color={theme.vars.palette.text.secondary}
            >
              개인정보 수집 및 이용
            </Typography>
            에 동의한 것으로 간주합니다.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Signup;
