"use client";

import NextLink from "next/link";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Divider,
  IconButton,
  InputAdornment,
  inputBaseClasses,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import {
  GgAddRIcon,
  IcRoundSearchIcon,
  MaterialSymbolsLogoutIcon,
  MingcuteBox2LineIcon,
  MingcuteNotificationLineIcon,
  MingcutePencilLineIcon,
  Popperx,
  toast,
  usePopperxState,
} from "@pency/ui/components";
import { useRouter } from "next/navigation";
import { useMeChannel } from "../me-channel-provider";
import { useLogout, useUserAuthMe } from "_core/user";

// ----------------------------------------------------------------------

export function Right() {
  const me = useUserAuthMe();
  const meChannel = useMeChannel();
  const theme = useTheme();
  const router = useRouter();

  const { anchorRef, isOpen, close, toggle } = usePopperxState();

  const { mutate } = useLogout();

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
            LinkComponent={NextLink}
            href="/library/view"
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
            ref={anchorRef}
            onClick={toggle}
            src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png"
            sx={{ width: 24, height: 24, mx: "6px" }}
          />

          <Popperx
            anchorEl={anchorRef.current}
            open={isOpen}
            onClose={close}
            placement="bottom-end"
            disablePortal
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 12],
                },
              },
            ]}
            slotProps={{
              paper: {
                sx: {
                  width: 360,
                  maxWidth: 360,
                  minHeight: 400,
                  px: "8px",
                  py: "6px",
                },
              },
            }}
          >
            <Stack>
              <ChannelUserProfileList />
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <MingcuteNotificationLineIcon fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText primary="알림" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton LinkComponent={NextLink} href="/library/view">
                    <ListItemIcon>
                      <MingcuteBox2LineIcon fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText primary="보관함" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (meChannel.length < 5) {
                        router.push("/channel/create");
                      } else {
                        toast.error("프로필당 최대 5개까지 채널을 개설할 수 있어요.");
                      }
                    }}
                  >
                    <ListItemIcon>
                      <GgAddRIcon fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText primary="새 채널 만들기" />
                  </ListItemButton>
                </ListItem>
              </List>

              <Divider />
              <List>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      mutate();
                    }}
                  >
                    <ListItemIcon>
                      <MaterialSymbolsLogoutIcon fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText primary="로그아웃" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Stack>
          </Popperx>
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

// ----------------------------------------------------------------------

function ChannelUserProfileList() {
  const theme = useTheme();
  const meChannel = useMeChannel();

  return (
    <>
      {meChannel.length > 0 ? (
        <>
          <List>
            {Array.from(meChannel, (channel) => (
              <ListItem component={NextLink} href={`/@${channel.url}`} key={channel.id}>
                <ListItemAvatar>
                  <Avatar src={channel.image} sx={{ width: 32, height: 32, borderRadius: 1 }} />
                </ListItemAvatar>
                <ListItemText sx={{ color: theme.vars.palette.text.primary }}>{channel.title}</ListItemText>
                <Box sx={{ flexShrink: 0, display: "flex", gap: 1 }}>
                  <Button LinkComponent={NextLink} href="TODO_스튜디오" variant="soft" size="small">
                    스튜디오
                  </Button>
                  <IconButton
                    LinkComponent={NextLink}
                    href={`editor/${channel.url}/webtoon`}
                    variant="soft"
                    size="small"
                    sx={{ borderRadius: 1 }}
                  >
                    <MingcutePencilLineIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
          <Divider />
        </>
      ) : null}
    </>
  );
}
