"use client";

import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { forwardRef } from "react";
import { COMPLETION_STATE_LABEL, CompletionState } from "../const";
import { EvaHeartOutlineIcon, EvaMoreVerticalOutlineIcon, RichCard } from "@pency/ui/components";

type Props = {
  data: {
    seriesId: string;
    thumbnail: string;
    genre: Genre;
    completionState: CompletionState;
    title: string;
    channel: {
      channelId: string;
      avatar: string;
      name: string;
    };
    postCount: number;
    likeCount: number;
    keywords?: string[];
  };
};

export const WT_Series_RichCard = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  return (
    <RichCard
      ref={ref}
      slots={{
        overlayElement: <RichCard.OverlayAnchor href={`/webtoon/series/${data.seriesId}`} />,
        thumbnail: (
          <RichCard.Thumbnail
            slots={{
              image: <RichCard.Thumbnail.Image src={data.thumbnail} />,
            }}
            sx={{ aspectRatio: "16/9" }}
          />
        ),
        labels: (
          <>
            <RichCard.Label variant="soft" color="warning">
              {GENRE_LABEL[data.genre]}
            </RichCard.Label>
            <RichCard.Label variant="soft" color="info">
              {COMPLETION_STATE_LABEL[data.completionState]}
            </RichCard.Label>
          </>
        ),
        avatarLink: (
          <RichCard.AvatarLink
            href={`/channel/${data.channel.channelId}`}
            slots={{
              avatar: <RichCard.AvatarLink.Avatar src={data.channel.avatar} />,
            }}
          />
        ),
        title: <RichCard.Title>{data.title}</RichCard.Title>,
        nameLink: (
          <RichCard.NameLink href={`/channel/${data.channel.channelId}`}>{data.channel.name}</RichCard.NameLink>
        ),
        attributes: (
          <>
            <RichCard.AttributeDot />
            <RichCard.Attribute>
              <RichCard.Attribute>{`총 ${data.postCount}화`}</RichCard.Attribute>
            </RichCard.Attribute>
            <RichCard.AttributeDot />
            <RichCard.Attribute>
              <EvaHeartOutlineIcon />
              {data.likeCount}
            </RichCard.Attribute>
          </>
        ),
        feedbackButton: (
          <RichCard.FeedbackButton>
            <EvaMoreVerticalOutlineIcon />
          </RichCard.FeedbackButton>
        ),
        chips: (
          <>
            {data.keywords
              ? Array.from(data.keywords, (keyword, i) => (
                  <RichCard.Chip
                    key={i}
                    label={keyword}
                    variant="soft"
                    size="small"
                    href={`/search?keyword=${keyword}`}
                  />
                ))
              : null}
          </>
        ),
      }}
    />
  );
});
