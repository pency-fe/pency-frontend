"use client";

import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { BrandInstagramIcon, BrandTwitterIcon, FluentHome24RegularIcon } from "@pency/ui/components";
import { isClient, useFirstMountState } from "@pency/util";
import { CH_Update_Form } from "_core/channel";
import { useUserAuthMeContext } from "_core/user";
import { redirect, useRouter } from "next/navigation";

// ----------------------------------------------------------------------

export default function SettingLinkPage() {
  const theme = useTheme();
  const router = useRouter();
  const me = useUserAuthMeContext();
  const isFirstMount = useFirstMountState();

  if (isFirstMount && !me.isLoggedIn) {
    if (isClient()) {
      router.push("/login");
    } else {
      redirect("/login");
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      noValidate
    >
      <Stack spacing={3}>
        <List>
          <Stack spacing={2}>
            <ListItem disablePadding>
              <ListItemIcon>
                <FluentHome24RegularIcon fontSize="medium" />
              </ListItemIcon>
              <TextField
                variant="filled"
                type="text"
                fullWidth
                label="홈"
                placeholder="URL(http 포함)을 입력해 주세요."
              />
            </ListItem>

            <ListItem disablePadding>
              <ListItemIcon>
                <BrandTwitterIcon fontSize="medium" />
              </ListItemIcon>
              <TextField
                variant="filled"
                type="text"
                fullWidth
                label="트위터(Twitter)"
                placeholder="URL(http 포함)을 입력해 주세요."
              />
            </ListItem>

            <ListItem disablePadding>
              <ListItemIcon>
                <BrandInstagramIcon fontSize="medium" />
              </ListItemIcon>
              <TextField
                variant="filled"
                type="text"
                fullWidth
                label="인스타그램(Instagram)"
                placeholder="URL(http 포함)을 입력해 주세요."
              />
            </ListItem>
          </Stack>
        </List>

        <Button type="submit" variant="contained" color="primary" onClick={() => {}} sx={{ alignSelf: "flex-end" }}>
          변경 내용 저장
        </Button>
      </Stack>
    </form>
  );
}
