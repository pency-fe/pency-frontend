import { useMeValue } from "(route)/(web)/me-provider";
import {
  Avatar,
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  inputBaseClasses,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { IcRoundSearchIcon, Menux, MingcuteNotificationLineIcon, useMenuxState } from "@pency/ui/components";
import NextLink from "next/link";

export function Right() {
  const theme = useTheme();
  const me = useMeValue();

  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  return (
    <Stack flexDirection="row" alignItems="center" spacing={1}>
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
          [`& .${inputBaseClasses.input}`]: { paddingLeft: 1.5, paddingY: 0 },
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
          {" "}
          <IconButton>
            <MingcuteNotificationLineIcon />
          </IconButton>
          <Avatar
            component={ButtonBase}
            ref={anchorRef}
            src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png"
            onClick={toggle}
            sx={{ width: 24, height: 24 }}
          />
          <Menux open={isOpen} anchorEl={anchorRef.current} placement="bottom-end" onClose={close}>
            <Menux.Item>
              <Menux.Item.Icon>
                <MingcuteNotificationLineIcon />
              </Menux.Item.Icon>
              북마크
            </Menux.Item>

            <Menux.Item>
              <Menux.Item.Icon>
                <MingcuteNotificationLineIcon />
              </Menux.Item.Icon>
              공유하기
            </Menux.Item>

            <Menux.Item>
              <Menux.Item.Icon>
                <MingcuteNotificationLineIcon />
              </Menux.Item.Icon>
              차단하기
            </Menux.Item>

            <Menux.Item>
              <Menux.Item.Icon>
                <MingcuteNotificationLineIcon />
              </Menux.Item.Icon>
              신고하기
            </Menux.Item>
          </Menux>
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
    </Stack>
  );
}
