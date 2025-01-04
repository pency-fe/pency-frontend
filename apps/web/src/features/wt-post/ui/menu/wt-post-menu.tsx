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
import { wtPostKeys, WtPostRichCard } from "@/entities/wt-post";
import { useQueryClient } from "@tanstack/react-query";
import { useBookmark } from "../../model/use-bookmark";
import { useUnbookmark } from "../../model/use-unbookmark";
import { useBlock } from "../../model/use-block";
import { useUnblock } from "../../model/use-unblock";
import { produce } from "immer";
import { useGenre } from "../../model/genre-context";
import { useSort } from "../../model/sort-context";
import { useCreationTypes } from "../../model/creation-types-context";
import { usePairs } from "../../model/pairs-context";
import { usePage } from "../../model/page-context";
import { useChannelUrl } from "../../model/channel-url-context";

export const WtPostMenu: ComponentProps<typeof WtPostRichCard>["Menu"] = ({ data, ...rest }) => {
  const { genre } = useGenre();
  const { sort } = useSort();
  const { page } = usePage();
  const { creationTypes } = useCreationTypes();
  const { pairs } = usePairs();
  const { channelUrl } = useChannelUrl();

  const queryClient = useQueryClient();
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
    console.log(genre, sort, page, creationTypes, pairs, channelUrl);
    if (data.bookmark) {
      unbookmark({ id: data.id }, () => {
        queryClient.setQueryData(
          wtPostKeys.page({ genre, sort, page, creationTypes, pairs, channelUrl }).queryKey,
          (oldData) =>
            oldData &&
            produce(oldData, (draft) => {
              draft.posts.find((post) => post.id === data.id)!.bookmark = false;
            }),
        );
      });
    } else {
      bookmark({ id: data.id }, () => {
        queryClient.setQueryData(
          wtPostKeys.page({ genre, sort, page, creationTypes, pairs, channelUrl }).queryKey,
          (oldData) =>
            oldData &&
            produce(oldData, (draft) => {
              draft.posts.find((post) => post.id === data.id)!.bookmark = true;
            }),
        );
      });
    }
  };

  const handleBlock = () => {
    if (data.block) {
      unblock({ id: data.channel.id }, () => {
        queryClient.setQueryData(
          wtPostKeys.page({ genre, sort, page, creationTypes, pairs, channelUrl }).queryKey,
          (oldData) =>
            oldData &&
            produce(oldData, (draft) => {
              draft.posts.find((post) => post.id === data.id)!.block = false;
            }),
        );
      });
    } else {
      block({ id: data.channel.id }, () => {
        queryClient.setQueryData(
          wtPostKeys.page({ genre, sort, page, creationTypes, pairs, channelUrl }).queryKey,
          (oldData) =>
            oldData &&
            produce(oldData, (draft) => {
              draft.posts.find((post) => post.id === data.id)!.block = true;
            }),
        );
      });
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
