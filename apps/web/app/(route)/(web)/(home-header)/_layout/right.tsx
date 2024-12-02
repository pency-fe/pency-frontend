"use client";

import { useMeValue } from "(route)/(web)/me-provider";
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
  IcRoundSearchIcon,
  MingcuteBox2LineIcon,
  MingcuteNotificationLineIcon,
  MingcutePencilLineIcon,
  Popperx,
  usePopperxState,
} from "@pency/ui/components";

export function Right() {
  const me = useMeValue();
  const theme = useTheme();

  const { anchorRef, isOpen, close, toggle } = usePopperxState();

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
            ref={anchorRef}
            onClick={toggle}
            src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png"
            sx={{ width: 24, height: 24, mx: "6px" }}
          />

          <Popperx
            anchorEl={anchorRef.current}
            open={isOpen}
            onClose={close}
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 6],
                },
              },
            ]}
          >
            <Stack sx={{ width: 360, maxWidth: 360, minHeight: 400, px: "8px", py: "6px" }}>
              <Stack>
                <ListItem
                  secondaryAction={
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button variant="contained" size="small">
                        스튜디오
                      </Button>
                      <IconButton variant="contained" size="small" sx={{ borderRadius: 1 }}>
                        <MingcutePencilLineIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="circular"
                      src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png"
                      sx={{ borderRadius: 1 }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="채널1" />
                </ListItem>

                <ListItem
                  secondaryAction={
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button variant="contained" size="small">
                        스튜디오
                      </Button>
                      <IconButton variant="contained" size="small" sx={{ borderRadius: 1 }}>
                        <MingcutePencilLineIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="circular"
                      src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png"
                      sx={{ borderRadius: 1 }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="채널2" />
                </ListItem>

                <ListItem
                  secondaryAction={
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button variant="contained" size="small">
                        스튜디오
                      </Button>
                      <IconButton variant="contained" size="small" sx={{ borderRadius: 1 }}>
                        <MingcutePencilLineIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="circular"
                      src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png"
                      sx={{ borderRadius: 1 }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary="채널3" />
                </ListItem>
              </Stack>
              <Divider />
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <MingcuteNotificationLineIcon />
                    </ListItemIcon>
                    <ListItemText primary="알림" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <MingcuteBox2LineIcon />
                    </ListItemIcon>
                    <ListItemText primary="보관함" />
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
