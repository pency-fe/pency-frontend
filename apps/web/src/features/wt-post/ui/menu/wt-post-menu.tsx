"use client";

import { ComponentProps, useMemo } from "react";
import { ListItemIcon, MenuItem } from "@mui/material";
import {
  EvaBookmarkOutlineIcon,
  FluentShare24RegularIcon,
  MaterialSymbolsBlockIcon,
  Menux,
} from "@pency/ui/components";
import { useChannelMeListContext } from "@/entities/channel-me";
import { WtPostRichCard } from "@/entities/wt-post";
import { useBookmark } from "../../model/use-bookmark";
import { useUnbookmark } from "../../model/use-unbookmark";
import { useBlock } from "../../model/use-block";
import { useUnblock } from "../../model/use-unblock";

export const WtPostMenu: ComponentProps<typeof WtPostRichCard>["Menu"] = ({ data, ...rest }) => {
  const channelMeList = useChannelMeListContext();

  const bookmark = useBookmark();
  const unbookmark = useUnbookmark();
  const block = useBlock();
  const unblock = useUnblock();

  const isMyPost = useMemo(() => {
    if (!channelMeList) {
      return false;
    }

    return channelMeList.some((channel) => channel.id === data.channel.id);
  }, [channelMeList, data]);

  const handleBookmark = () => {
    if (data.bookmark) {
      unbookmark({ id: data.id });
    } else {
      bookmark({ id: data.id });
    }
  };

  const handleBlock = () => {
    if (data.block) {
      unblock({ id: data.channel.id });
    } else {
      block({ id: data.channel.id });
    }
  };

  return (
    <Menux {...rest}>
      {!isMyPost ? (
        <MenuItem onClick={handleBookmark}>
          <ListItemIcon>
            <EvaBookmarkOutlineIcon />
          </ListItemIcon>
          {data.bookmark ? "북마크 해제" : "북마크"}
        </MenuItem>
      ) : null}

      <MenuItem>
        <ListItemIcon>
          <FluentShare24RegularIcon />
        </ListItemIcon>
        공유하기
      </MenuItem>

      {!isMyPost ? (
        <MenuItem onClick={handleBlock}>
          <ListItemIcon>
            <MaterialSymbolsBlockIcon />
          </ListItemIcon>
          {data.block ? "채널차단 해제" : "채널차단"}
        </MenuItem>
      ) : null}
    </Menux>
  );
};
