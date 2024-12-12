"use client";

import { useMe } from "(route)/(web)/me-provider";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Collapse,
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
  MingcuteBox2LineIcon,
  MingcuteNotificationLineIcon,
  MingcutePencilLineIcon,
  Popperx,
  toast,
  usePopperxState,
} from "@pency/ui/components";
import { useRouter } from "next/navigation";
import { channelUserProfileKeys } from "_core/channel/query/queries";
import { useQuery } from "@tanstack/react-query";

// ----------------------------------------------------------------------

export function Right() {
  const me = useMe();
  const theme = useTheme();
  const router = useRouter();

  const { anchorRef, isOpen, close, toggle } = usePopperxState();

  const { data } = useQuery({
    ...channelUserProfileKeys.list({ id: me.userProfileId as number }),
    enabled: !!me.userProfileId,
  });

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
                  {/* 요구사항: 클릭했을 때 채널 최대 5개를 넘기면 이동을 안시키겠다.
                  문제: 채널 몇 개인지 어떻게 알지?
                  왜 이런 문제가 발생할까? 이 컴포넌트에서 데이터를 가져오지 않아서.
                  해결:
                  1. 이 컴포넌트에서 데이터를 가져오면 된다. -> 장단점
                     지금은 간단하다.
                     /channel/create -> 여기서도 개수가 필요하지, 데이터 쏘겠지
                     쿼리를 세번 사용한다. -> 로딩, 에러, 완료 9번 작성해야 한다.

                     결론: 이 해결책은 지금 당장의 문제만 해결하기 편해. 현재 문제에 대해서만 코드를 쉽게 작성할 수 있다.
                     
                  2. 상위 컴포넌트에서 데이터를 가져와서 밑으로 내려주면 된다. -> 장단점
                     지금은 복잡하다.
                     /channel/create -> 여기서도 개수가 필요하지,
                     쿼리를 한번 사용한다. -> 3번만 작성하면 된다.

                     결론: 이 해결책은 지금과 가까운 미래의 문제들을 해결하기 편해. 하지만 코드를 좀 더 작성해야 된다.


                  해결책 구현 전략
                  데이터를 가져와서 밑으로 내려주면 된다. context, provier, hook 구현들어가면 될 것 같해.
                  provider 위치가 위치가 중요하다. context-provider는 의존성 관리 도구야.
                  */}
                  <ListItemButton
                    onClick={() => {
                      if (data !== undefined && data.length < 5) {
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
  const me = useMe();

  const { data } = useQuery({
    ...channelUserProfileKeys.list({ id: me.userProfileId as number }),
    enabled: !!me.userProfileId,
  });

  return (
    <>
      {data !== undefined && data?.length >= 0 ? (
        <>
          <List>
            {Array.from(data, (channel) => (
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
                    href={`editor/@${channel.url}/webtoon`}
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
