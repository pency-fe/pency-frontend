"use client";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { BrandAppleIcon, BrandGoogleIcon, BrandNaverIcon, IcOutlineEmailIcon } from "@pency/ui/components";
import React, { useEffect, useState } from "react";

const Signup = () => {
  const theme = useTheme();
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  console.log("checked: ", checked);

  const handleCheckedChange = () => {
    setChecked(!checked);
    setError(checked);
  };

  const handleEmailClick = (event: { preventDefault: () => void }) => {
    if (!checked) {
      event.preventDefault(); // 페이지 이동 방지
      setError(true); // 오류 메시지 표시
    }
  };

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

          <Button href={"/signup/email"} onClick={handleEmailClick} variant="soft" startIcon={<IcOutlineEmailIcon />}>
            이메일 회원가입
          </Button>
        </Stack>

        <Stack spacing={1.5}>
          <Box>
            <FormControl required error={error} component="fieldset" variant="standard">
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleCheckedChange} />}
                label={<Typography variant="body2">만 14세 이상입니다.</Typography>}
              />
              {error === true ? (
                <FormHelperText variant="standard" sx={{ marginTop: 0 }}>
                  <Typography variant="body2">펜시 가입은 만 14세 이상부터 가능해요.</Typography>
                </FormHelperText>
              ) : null}
            </FormControl>
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
