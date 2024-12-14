"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  useTheme,
} from "@mui/material";
import {
  GgAddRIcon,
  MaterialSymbolsLogoutIcon,
  MingcuteBox2LineIcon,
  MingcuteNotificationLineIcon,
  MingcutePencilLineIcon,
  Popperx,
  toast,
  usePopperxState,
} from "@pency/ui/components";
import { useChannelMeListContext } from "_core/channel";
import { useLogout } from "_core/user";

export function UserProfile() {
  const meChannel = useChannelMeListContext();
  const { mutate: logout } = useLogout();

  const { anchorRef, isOpen, close, toggle } = usePopperxState();
  const router = useRouter();

  return (
    <>
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
          <ChannelMeList />
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
                  logout(undefined, {
                    onSuccess: () => {
                      window.location.reload();
                    },
                  });
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
  );
}

// ----------------------------------------------------------------------

function ChannelMeList() {
  const theme = useTheme();
  const meChannel = useChannelMeListContext();

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
                    href={`/editor/${channel.url}/webtoon`}
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
