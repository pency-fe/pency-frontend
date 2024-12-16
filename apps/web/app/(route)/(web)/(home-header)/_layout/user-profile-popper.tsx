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
  Typography,
  useTheme,
} from "@mui/material";
import {
  EvaArrowIosDownwardFillIcon,
  EvaArrowIosUpwardFillIcon,
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
import { useSelectedUserProfileContext, useUserProfileMeListContext } from "_core/user-profile";
import { useToggle } from "@pency/util";

export function UserProfile() {
  const channelMe = useChannelMeListContext();
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
              width: "min(100vw, 360px)",
              minHeight: 400,
              px: "8px",
              py: "6px",
            },
          },
        }}
      >
        <Stack>
          <UserProfileMe togglePopper={toggle} />
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  toggle(false);
                }}
              >
                <ListItemIcon>
                  <MingcuteNotificationLineIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="알림" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                LinkComponent={NextLink}
                href="/library/view"
                onClick={() => {
                  toggle(false);
                }}
              >
                <ListItemIcon>
                  <MingcuteBox2LineIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="보관함" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (channelMe.length < 5) {
                    toggle(false);
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
type UserProfileMeProps = {
  togglePopper: (nextValue?: any) => void;
};

function UserProfileMe({ togglePopper }: UserProfileMeProps) {
  const theme = useTheme();
  const userProfileMeList = useSelectedUserProfileContext();
  const [open, toggle] = useToggle(true);

  return (
    <>
      <List>
        <ListItem
          key={userProfileMeList.id}
          onClick={() => {
            toggle();
          }}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <ListItemAvatar>
            <Avatar src={userProfileMeList.image ?? process.env["NEXT_PUBLIC_AVATAR"]} sx={{ width: 32, height: 32 }} />
          </ListItemAvatar>
          <ListItemText sx={{ color: theme.vars.palette.text.primary }}>{userProfileMeList.nickname}</ListItemText>

          {open ? <EvaArrowIosDownwardFillIcon /> : <EvaArrowIosUpwardFillIcon />}
        </ListItem>
        {!open ? <UserProfileMeList /> : null}
      </List>
      {open ? <ChannelMeList togglePopper={togglePopper} /> : null}
    </>
  );
}

// ----------------------------------------------------------------------

function UserProfileMeList() {
  const theme = useTheme();
  const userProfileMeList = useUserProfileMeListContext();

  return (
    <>
      {userProfileMeList.map((profile) => (
        <ListItem key={profile.id} disablePadding sx={{ display: "flex", alignItems: "center" }}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar
                src={profile.image ?? process.env["NEXT_PUBLIC_AVATAR"]}
                sx={{ width: 24, height: 24, mx: 0.5 }}
              />
            </ListItemAvatar>
            <ListItemText sx={{ color: theme.vars.palette.text.primary }}>
              <Typography variant="body1">{profile.nickname}</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
}

// ----------------------------------------------------------------------

type ChannelMeListProps = {
  togglePopper: (nextValue?: any) => void;
};

function ChannelMeList({ togglePopper }: ChannelMeListProps) {
  const theme = useTheme();
  const channelMe = useChannelMeListContext();

  return (
    <>
      <Divider />
      {channelMe.length > 0 ? (
        <>
          <List>
            {channelMe.map((channel) => (
              <ListItem key={channel.id} sx={{ display: "flex", alignItems: "center" }}>
                <ButtonBase
                  disableRipple
                  component={NextLink}
                  href={`/@${channel.url}`}
                  onClick={() => {
                    togglePopper(false);
                  }}
                  sx={{ position: "absolute", inset: 0, zIndex: 1 }}
                />
                <ListItemAvatar>
                  <Avatar
                    src={channel.image ?? process.env["NEXT_PUBLIC_LOGO"]}
                    sx={{ width: 32, height: 32, borderRadius: 1 }}
                  />
                </ListItemAvatar>
                <ListItemText sx={{ color: theme.vars.palette.text.primary }}>{channel.title}</ListItemText>
                <Box sx={{ flexShrink: 0, display: "flex", gap: 1 }}>
                  <Button
                    LinkComponent={NextLink}
                    href="TODO_스튜디오"
                    variant="soft"
                    size="small"
                    sx={{ zIndex: 2 }}
                    onClick={() => {
                      togglePopper(false);
                    }}
                  >
                    스튜디오
                  </Button>
                  <IconButton
                    LinkComponent={NextLink}
                    href={`/editor/${channel.url}/webtoon`}
                    variant="soft"
                    size="small"
                    onClick={() => {
                      togglePopper(false);
                    }}
                    sx={{ borderRadius: 1, zIndex: 2 }}
                  >
                    <MingcutePencilLineIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </>
      ) : null}
    </>
  );
}
