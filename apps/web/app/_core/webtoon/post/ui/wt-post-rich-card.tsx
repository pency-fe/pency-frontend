"use client";

import { forwardRef, useMemo } from "react";
import {
  EvaBookmarkOutlineIcon,
  EvaHeartOutlineIcon,
  EvaMoreVerticalOutlineIcon,
  FluentShare24RegularIcon,
  GravityUiCircleCheckFillIcon,
  MaterialSymbolsBlockIcon,
  Menux,
  NineteenCircleIcon,
  RichCard,
  toast,
  useMenuxState,
} from "@pency/ui/components";
import { Age, CreationType, CREATION_TYPE_LABEL, Pair, PAIR_LABEL } from "../const";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { formatRelativeTimeFromUTC } from "@pency/util";
import { Box, ListItemIcon, MenuItem, Skeleton, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUserAuthMeContext } from "_core/user";
import { useBlock, useChannelMeListContext, useUnblock } from "_core/channel";
import { useBookmark, useUnbookmark } from "../query";

type WT_Post_RichCardFnProps = {
  data: {
    id: number;
    thumbnail: string;
    age: Age;
    price: number;
    purchased: boolean;
    creationType: CreationType;
    pair: Pair;
    genre: Genre;
    title: string;
    channel: {
      id: number;
      url: string;
      image: string;
      title: string;
    };
    likeCount: number;
    createdAt: number;
    keywords: string[];
    bookmark: boolean;
    block: boolean;
  };
  onBookmark: (id: number) => void;
  onUnbookmark: (id: number) => void;
  onBlock: (id: number) => void;
  onUnblock: (id: number) => void;
  hideGenre?: boolean;
};

const WT_Post_RichCardFn = forwardRef<HTMLDivElement, WT_Post_RichCardFnProps>(
  ({ data, onBookmark, onUnbookmark, onBlock, onUnblock, hideGenre = false }, ref) => {
    const me = useUserAuthMeContext();
    const meChannel = me.isLoggedIn ? useChannelMeListContext() : [];
    const { mutate: bookmark } = useBookmark();
    const { mutate: unbookmark } = useUnbookmark();
    const { mutate: block } = useBlock();
    const { mutate: unblock } = useUnblock();

    const { anchorRef, isOpen, close, toggle } = useMenuxState();

    const router = useRouter();

    const isMyPost = useMemo(() => {
      return meChannel.some((channel) => channel.id === data.channel.id);
    }, [meChannel, data]);

    const handleBookmarkClick = (id: number) => {
      if (!me.isLoggedIn) {
        router.push("/login");
        return;
      }

      if (data.block) {
        unbookmark(
          { id },
          {
            onSuccess: () => {
              onUnbookmark(id);
              toast.success("북마크에 추가했어요.");
            },
            onError: async (error) => {
              if (error.code === "ALREADY_PROCESSED_REQUEST") {
                toast.error("이미 북마크에 추가했어요.");
              }
            },
          },
        );
      } else {
        bookmark(
          { id },
          {
            onSuccess: () => {
              onBookmark(id);
              toast.success("북마크에서 제외했어요.");
            },
            onError: async (error) => {
              if (error.code === "ALREADY_PROCESSED_REQUEST") {
                toast.error("이미 북마크에서 제외했어요.");
              }

              if (error.code === "SELF_FORBIDDEN") {
                toast.error("자신의 포스트는 북마크할 수 없어요.");
              }
            },
          },
        );
      }
    };

    const handleBlockClick = (id: number) => {
      if (!me.isLoggedIn) {
        router.push("/login");
        return;
      }

      if (data.block) {
        unblock(
          { id },
          {
            onSuccess: () => {
              onUnblock(id);
              toast.success("채널을 차단했어요.");
            },
            onError: async (error) => {
              if (error.code === "ALREADY_PROCESSED_REQUEST") {
                toast.error("이미 채널을 차단했어요.");
              }
            },
          },
        );
      } else {
        block(
          { id },
          {
            onSuccess: () => {
              onBlock(id);
              toast.success("채널 차단을 해제했어요.");
            },
            onError: async (error) => {
              if (error.code === "ALREADY_PROCESSED_REQUEST") {
                toast.error("이미 채널 차단을 해제했어요.");
              }

              if (error.code === "SELF_FORBIDDEN") {
                toast.error("자신의 채널은 차단할 수 없어요.");
              }
            },
          },
        );
      }
    };

    return (
      <RichCard
        ref={ref}
        slots={{
          overlayElement: <RichCard.OverlayAnchor href={`/@${data.channel.url}/webtoon/post/${data.id}`} />,
          thumbnail: (
            <RichCard.Thumbnail
              slots={{
                image: <RichCard.Thumbnail.Image src={data.thumbnail} />,
                topEnds: data.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
              }}
              sx={{ aspectRatio: "16/9" }}
            />
          ),
          labels: (
            <>
              {data.price ? (
                <RichCard.Label
                  variant="soft"
                  color="success"
                  slots={{ startIcon: data.purchased ? <GravityUiCircleCheckFillIcon /> : null }}
                >
                  {data.price}P
                </RichCard.Label>
              ) : null}
              <RichCard.Label variant="soft" color="secondary">
                {CREATION_TYPE_LABEL[data.creationType]}
              </RichCard.Label>
              {data.pair !== "NONE" ? (
                <RichCard.Label variant="soft" color="warning">
                  {PAIR_LABEL[data.pair]}
                </RichCard.Label>
              ) : null}
              {!hideGenre ? (
                <RichCard.Label variant="soft" color="warning">
                  {GENRE_LABEL[data.genre]}
                </RichCard.Label>
              ) : null}
            </>
          ),
          avatarLink: (
            <RichCard.AvatarLink
              href={`/@${data.channel.url}`}
              slots={{
                avatar: <RichCard.AvatarLink.Avatar src={data.channel.image} />,
              }}
            />
          ),
          title: <RichCard.Title>{data.title}</RichCard.Title>,
          nameLink: <RichCard.NameLink href={`/@${data.channel.url}`}>{data.channel.title}</RichCard.NameLink>,
          attributes: (
            <>
              <RichCard.AttributeDot />
              <RichCard.Attribute>
                <EvaHeartOutlineIcon />
                {data.likeCount}
              </RichCard.Attribute>
              <RichCard.AttributeDot />
              <RichCard.Attribute>{formatRelativeTimeFromUTC(data.createdAt)}</RichCard.Attribute>
            </>
          ),
          feedbackButton: (
            <>
              <RichCard.FeedbackButton ref={anchorRef} onClick={toggle}>
                <EvaMoreVerticalOutlineIcon />
              </RichCard.FeedbackButton>

              <Menux open={isOpen} anchorEl={anchorRef.current} placement="left-start" onClose={close}>
                {!isMyPost ? (
                  <MenuItem
                    onClick={() => {
                      handleBookmarkClick(data.id);
                    }}
                  >
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
                  <MenuItem
                    onClick={() => {
                      handleBlockClick(data.id);
                    }}
                  >
                    <ListItemIcon>
                      <MaterialSymbolsBlockIcon />
                    </ListItemIcon>
                    {data.block ? "채널차단 해제" : "채널차단"}
                  </MenuItem>
                ) : null}
              </Menux>
            </>
          ),
          chips: (
            <>
              {data.keywords.length
                ? data.keywords.map((keyword, i) => (
                    <RichCard.Chip key={i} label={keyword} variant="soft" size="small" href={`/[TODO]키워드_검색`} />
                  ))
                : null}
            </>
          ),
        }}
      />
    );
  },
);

// ----------------------------------------------------------------------

const LoadingFn = () => {
  return (
    <Stack gap={1.5}>
      <Skeleton animation="wave" sx={{ height: "auto", aspectRatio: "16/9" }} />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Skeleton variant="circular" animation="wave" width={36} height={36} />
        <Stack sx={{ flex: "1 1 auto", gap: 0.5 }}>
          <Skeleton animation="wave" height={14} />
          <Skeleton animation="wave" height={12} />
        </Stack>
      </Box>
    </Stack>
  );
};

// ----------------------------------------------------------------------

export const WT_Post_RichCard = Object.assign(WT_Post_RichCardFn, {
  Loading: LoadingFn,
});
