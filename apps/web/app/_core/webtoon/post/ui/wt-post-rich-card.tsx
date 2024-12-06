"use client";

import { forwardRef } from "react";
import {
  EvaBookmarkOutlineIcon,
  EvaHeartOutlineIcon,
  EvaMoreVerticalOutlineIcon,
  FluentShare24RegularIcon,
  GravityUiCircleCheckFillIcon,
  MaterialSymbolsBlockIcon,
  MaterialSymbolsReportOutlineIcon,
  Menux,
  NineteenCircleIcon,
  RichCard,
  useMenuxState,
} from "@pency/ui/components";
import { Age, CreationType, CREATION_TYPE_LABEL, Pair, PAIR_LABEL } from "../const";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { formatRelativeTimeFromUTC } from "@pency/util";
import { ListItemIcon, MenuItem } from "@mui/material";

type Props = {
  data: {
    postId: string;
    thumbnail: string;
    age: Age;
    price: number;
    purchased: boolean;
    creationType: CreationType;
    pair: Pair;
    genre: Genre;
    title: string;
    channel: {
      channelUrl: string;
      image: string;
      title: string;
    };
    likeCount: number;
    createdAt: number;
    keywords: string[];
  };
  hideGenre?: boolean;
};

export const WT_Post_RichCard = forwardRef<HTMLDivElement, Props>(({ data, hideGenre = false }, ref) => {
  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  return (
    <RichCard
      ref={ref}
      slots={{
        overlayElement: <RichCard.OverlayAnchor href={`/@${data.channel.channelUrl}/webtoon/post/${data.postId}`} />,
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
            href={`/@${data.channel.channelUrl}`}
            slots={{
              avatar: <RichCard.AvatarLink.Avatar src={data.channel.image} />,
            }}
          />
        ),
        title: <RichCard.Title>{data.title}</RichCard.Title>,
        nameLink: <RichCard.NameLink href={`/@${data.channel.channelUrl}`}>{data.channel.title}</RichCard.NameLink>,
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
              <MenuItem>
                <ListItemIcon>
                  <EvaBookmarkOutlineIcon />
                </ListItemIcon>
                북마크
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <FluentShare24RegularIcon />
                </ListItemIcon>
                공유하기
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <MaterialSymbolsBlockIcon />
                </ListItemIcon>
                차단하기
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <MaterialSymbolsReportOutlineIcon />
                </ListItemIcon>
                신고하기
              </MenuItem>
            </Menux>
          </>
        ),
        chips: (
          <>
            {data.keywords.length
              ? Array.from(data.keywords, (keyword, i) => (
                  <RichCard.Chip key={i} label={keyword} variant="soft" size="small" href={`/[TODO]키워드_검색`} />
                ))
              : null}
          </>
        ),
      }}
    />
  );
});
