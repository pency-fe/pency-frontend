"use client";

import { useMeValue } from "(route)/(web)/me-provider";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  inputBaseClasses,
  TextField,
  useTheme,
} from "@mui/material";
import { IcRoundSearchIcon, MingcuteBox2LineIcon, MingcuteNotificationLineIcon } from "@pency/ui/components";

export function Right() {
  const me = useMeValue();
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <TextField
        placeholder="검색어를 입력해 주세요."
        variant="filled"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IcRoundSearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          [`& .${inputBaseClasses.root}`]: { height: 36 },
          [`& .${inputBaseClasses.input}`]: { pl: 1.5, py: 0 },
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      />

      <IconButton
        sx={{
          [theme.breakpoints.up("sm")]: {
            display: "none",
          },
        }}
      >
        <IcRoundSearchIcon />
      </IconButton>

      {me.isLoggedIn ? (
        <>
          <IconButton
            sx={{
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            }}
          >
            <MingcuteNotificationLineIcon />
          </IconButton>
          <IconButton
            sx={{
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            }}
          >
            <MingcuteBox2LineIcon />
          </IconButton>
          <Avatar
            component={ButtonBase}
            src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png"
            sx={{ width: 24, height: 24, mx: "6px" }}
          />
        </>
      ) : (
        <>
          <Button LinkComponent={NextLink} href="/login" variant="text" size="medium">
            로그인
          </Button>
          <Button LinkComponent={NextLink} href="/signup" variant="text" size="medium" color="primary">
            회원가입
          </Button>
        </>
      )}
    </Box>
  );
}
