"use client";

import { ComponentProps } from "react";
import { WtEpisodeRichCard } from "@/entities/wt-episode";
import {
  EvaBookmarkOutlineIcon,
  FluentShare24RegularIcon,
  MaterialSymbolsBlockIcon,
  Menux,
  MingcuteDelete3LineIcon,
} from "@pency/ui/components";
import { ListItemIcon, MenuItem, Typography, useTheme } from "@mui/material";

export const WtPostViewMenu: ComponentProps<typeof WtEpisodeRichCard>["Menu"] = ({ ...rest }) => {
  const theme = useTheme();

  return (
    <Menux {...rest}>
      {/* {!isMyPost ? ( */}
      <MenuItem>
        <ListItemIcon>
          <EvaBookmarkOutlineIcon />
        </ListItemIcon>
        {/* {data.bookmark ? "북마크 해제" : "북마크"} */}
        북마크
      </MenuItem>
      {/* ) : null} */}

      <MenuItem>
        <ListItemIcon>
          <FluentShare24RegularIcon />
        </ListItemIcon>
        공유하기
      </MenuItem>

      {/* {!isMyPost ? ( */}
      <MenuItem>
        <ListItemIcon>
          <MaterialSymbolsBlockIcon />
        </ListItemIcon>
        {/* {data.block ? "채널차단 해제" : "채널차단"} */}
        채널차단
      </MenuItem>
      {/* ) : null} */}

      <MenuItem>
        <ListItemIcon sx={{ color: theme.vars.palette.error.main }}>
          <MingcuteDelete3LineIcon />
        </ListItemIcon>
        <Typography color={theme.vars.palette.error.main}>최근 목록에서 삭제</Typography>
      </MenuItem>
    </Menux>
  );
};
