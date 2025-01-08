"use client";

import { useMemo } from "react";
import { ListItemIcon, MenuItem } from "@mui/material";
import {
  EvaBookmarkOutlineIcon,
  EvaMoreVerticalOutlineIcon,
  FluentShare24RegularIcon,
  MaterialSymbolsBlockIcon,
  Menux,
  RichCard,
  useMenuxState,
} from "@pency/ui/components";
import { useChannelMeListContext } from "@/entities/channel-me";
import { useBlock } from "../../model/use-block";
import { useUnblock } from "../../model/use-unblock";
import { useBookmark } from "../../model/use-bookmark";
import { useUnbookmark } from "../../model/use-unbookmark";
import { FeedbackButtonComponent } from "../../model/feedback-button-types";

export const WtSeriesFeedbackButton: FeedbackButtonComponent = ({ data }) => {
  const channelMeList = useChannelMeListContext();

  const bookmark = useBookmark();
  const unbookmark = useUnbookmark();
  const block = useBlock();
  const unblock = useUnblock();

  const { anchorRef, isOpen, close, toggle } = useMenuxState();

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
    <>
      <RichCard.FeedbackButton ref={anchorRef} onClick={toggle}>
        <EvaMoreVerticalOutlineIcon />
      </RichCard.FeedbackButton>

      <Menux open={isOpen} anchorEl={anchorRef.current} placement="left-start" onClose={close}>
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
    </>
  );
};
