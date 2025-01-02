"use client";

import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import {
  Box,
  Dialog,
  dialogClasses,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  tabsClasses,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { EvaInfoOutlineIcon, MaterialSymbolsCloseIcon, MingcutePencilLineIcon } from "@pency/ui/components";
import { objectEntries, useToggle } from "@pency/util";
import NextLink from "next/link";
import { useMemo, useState } from "react";

type NewPostIconButtonProps = {
  channelUrl: string;
};

export const NewPostIconButton = ({ channelUrl }: NewPostIconButtonProps) => {
  const [open, toggle] = useToggle(false);

  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <IconButton onClick={toggle} variant="soft" size="small" sx={{ borderRadius: 1, zIndex: 2 }}>
        <MingcutePencilLineIcon />
      </IconButton>
      <Dialog
        open={open}
        fullWidth
        fullScreen={isUpSm ? false : true}
        closeAfterTransition
        onClose={() => toggle(false)}
        sx={{
          [theme.breakpoints.up("sm")]: {
            [`& .${dialogClasses.paper}`]: {
              maxWidth: "400px",
              maxHeight: 1,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px 16px 6px 16px",
            [theme.breakpoints.up("sm")]: { flexDirection: "row-reverse" },
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => toggle(false)}
            sx={{
              [theme.breakpoints.up("sm")]: { ml: "auto" },
            }}
          >
            <MaterialSymbolsCloseIcon />
          </IconButton>
          <Typography variant="h6">새 포스트 쓰기</Typography>
        </Box>
        <Divider />
        <Content channelUrl={channelUrl} />
      </Dialog>
    </>
  );
};

type NavValue = "WEBTOON" | "WEBNOVEL";

const NAV_VALUE_LABEL: Record<NavValue, string> = {
  WEBTOON: "웹툰",
  WEBNOVEL: "웹소설",
} as const;

const Content = ({ channelUrl }: { channelUrl: string }) => {
  const [nav, setNav] = useState<NavValue>("WEBTOON");

  const navEntries = useMemo(() => objectEntries(NAV_VALUE_LABEL), []);

  return (
    <DialogContent
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px 16px 16px",
      }}
    >
      <Tabs
        value={nav}
        onChange={(_, value) => {
          setNav(value);
        }}
        sx={{ [`& .${tabsClasses.flexContainer}`]: { gap: 2 } }}
      >
        {navEntries.map(([value, label]) => (
          <Tab key={value} value={value} label={<Typography variant="subtitle2">{label}</Typography>} />
        ))}
      </Tabs>
      {nav === "WEBTOON" ? (
        <List>
          <ListItem disablePadding>
            <ListItemButton component={NextLink} href={`/editor/${formatChannelUrl(channelUrl)}/webtoon`}>
              <ListItemIcon>
                <EvaInfoOutlineIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary="포스트 쓰기" secondary="웹툰 창작이 가능한 포스트" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={NextLink} href={`/editor/${formatChannelUrl(channelUrl)}/webtoon`}>
              <ListItemIcon>
                <EvaInfoOutlineIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary="새 시리즈 만들기" secondary="여러 웹툰 포스트를 작품으로 만들어주는 시리즈" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={NextLink} href={`/editor/${formatChannelUrl(channelUrl)}/webtoon`}>
              <ListItemIcon>
                <EvaInfoOutlineIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary="임시저장 포스트" secondary="임시 저장된 웹툰 포스트" />
            </ListItemButton>
          </ListItem>
        </List>
      ) : null}

      {nav === "WEBNOVEL" ? (
        <List>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={NextLink} href={`/studio/${channelUrl}/setting/branding`}>
              <ListItemIcon>
                <EvaInfoOutlineIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary="포스트 쓰기" secondary="웹소설 창작이 가능한 포스트" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={NextLink} href={`/studio/${channelUrl}/setting/link`}>
              <ListItemIcon>
                <EvaInfoOutlineIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary="새 시리즈 만들기" secondary="여러 웹소설 포스트를 작품으로 만들어주는 시리즈" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={NextLink} href={`/studio/${channelUrl}/setting/blocked-users`}>
              <ListItemIcon>
                <EvaInfoOutlineIcon fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary="임시저장 포스트" secondary="임시 저장된 웹소설 포스트" />
            </ListItemButton>
          </ListItem>
        </List>
      ) : null}
    </DialogContent>
  );
};
