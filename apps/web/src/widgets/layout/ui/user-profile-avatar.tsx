"use client";

import { useCallback } from "react";
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
import { useSelectedUserProfileMeContext } from "@/entities/user-profile-me";
import { useChannelMeListContext } from "@/entities/channel-me";
import { useLogout } from "../api/mutations";

export function UserProfileAvatar() {
  const userProfileMe = useSelectedUserProfileMeContext()!;
  const { anchorRef, isOpen, close: onClose, toggle } = usePopperxState();

  const close = useCallback(() => {
    toggle(false);
  }, [toggle]);

  return (
    <>
      <Avatar
        component={ButtonBase}
        ref={anchorRef}
        onClick={toggle}
        src={userProfileMe.image ?? process.env["NEXT_PUBLIC_AVATAR"]}
        sx={{ width: 24, height: 24, mx: "6px" }}
      />
      <Popperx
        anchorEl={anchorRef.current}
        open={isOpen}
        onClose={onClose}
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
          <UserProfileMe close={close} />
          <ChannelMeList close={close} />
          <MainMenuList close={close} />
          <EtcMenuList />
        </Stack>
      </Popperx>
    </>
  );
}

// ----------------------------------------------------------------------

function UserProfileMe({ close }: { close: () => void }) {
  const userProfileMe = useSelectedUserProfileMeContext()!;
  const theme = useTheme();

  return (
    <>
      <List>
        <ListItem
          key={userProfileMe.id}
          component={NextLink}
          href={`/profile/@${userProfileMe.url}`}
          onClick={close}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ListItemAvatar>
            <Avatar src={userProfileMe.image ?? process.env["NEXT_PUBLIC_AVATAR"]} sx={{ width: 32, height: 32 }} />
          </ListItemAvatar>
          <ListItemText sx={{ color: theme.vars.palette.text.primary }}>{userProfileMe.nickname}</ListItemText>
        </ListItem>
      </List>
      <Divider />
    </>
  );
}

// ----------------------------------------------------------------------

function ChannelMeList({ close }: { close: () => void }) {
  const channelMeList = useChannelMeListContext()!;
  const theme = useTheme();

  return (
    <>
      {channelMeList.length > 0 ? (
        <>
          <List>
            {channelMeList.map((channel) => (
              <ListItem key={channel.id} sx={{ display: "flex", alignItems: "center" }}>
                <ButtonBase
                  disableRipple
                  component={NextLink}
                  href={`/@${channel.url}`}
                  onClick={() => {
                    close();
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
                    href={`/studio/@${channel.url}/dashboard`}
                    variant="soft"
                    size="small"
                    sx={{ zIndex: 2 }}
                  >
                    스튜디오
                  </Button>
                  <IconButton
                    LinkComponent={NextLink}
                    href={`/editor/@${channel.url}/webtoon`}
                    variant="soft"
                    size="small"
                    sx={{ borderRadius: 1, zIndex: 2 }}
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

//

function MainMenuList({ close }: { close: () => void }) {
  const channelMeList = useChannelMeListContext()!;
  const router = useRouter();
  const handleNewChannelCreateClick = () => {
    if (channelMeList.length < 5) {
      router.push("/channel/create");
      close();
      return;
    } else {
      toast.error("최대 5개까지 채널을 개설할 수 있어요.");
    }
  };

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              close();
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
              close();
            }}
          >
            <ListItemIcon>
              <MingcuteBox2LineIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="보관함" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleNewChannelCreateClick}>
            <ListItemIcon>
              <GgAddRIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="새 채널 만들기" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </>
  );
}

function EtcMenuList() {
  const { mutate } = useLogout();

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            mutate(undefined, {
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
  );
}
