"use client";

import NextLink from "next/link";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import {
  EvaArrowIosForwardFillIcon,
  EvaInfoOutlineIcon,
  EvaLink2FillIcon,
  MaterialSymbolsBlockIcon,
} from "@pency/ui/components";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";

export const StudioSettingPage = () => {
  const theme = useTheme();
  const channelUrl = useChannelUrlParam();

  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton LinkComponent={NextLink} href={`/studio/${channelUrl}/setting/branding`}>
          <ListItemIcon>
            <EvaInfoOutlineIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="채널 정보" secondary="채널 이미지, 제목, 설명, 디자인을 관리할 수 있어요." />
          <EvaArrowIosForwardFillIcon sx={{ height: 24, width: 24, color: theme.vars.palette.text.secondary }} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton LinkComponent={NextLink} href={`/studio/${channelUrl}/setting/link`}>
          <ListItemIcon>
            <EvaLink2FillIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText
            primary="소셜 링크"
            secondary="채널에 표시되는 소셜 미디어 및 웹사이트 링크를 관리할 수 있어요."
          />
          <EvaArrowIosForwardFillIcon sx={{ height: 24, width: 24, color: theme.vars.palette.text.secondary }} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton LinkComponent={NextLink} href={`/studio/${channelUrl}/setting/blocked-users`}>
          <ListItemIcon>
            <MaterialSymbolsBlockIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="차단한 이용자" secondary="채널에 접근 금지된 이용자를 관리할 수 있어요." />
          <EvaArrowIosForwardFillIcon sx={{ height: 24, width: 24, color: theme.vars.palette.text.secondary }} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};
