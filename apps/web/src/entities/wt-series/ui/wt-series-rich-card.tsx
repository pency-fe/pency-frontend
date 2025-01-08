"use client";

import {
  Age,
  CREATION_TYPE_LABEL,
  CreationType,
  Genre,
  GENRE_LABEL,
  Pair,
  PAIR_LABEL,
  SERIES_TYPE_LABEL,
  SeriesType,
} from "@/shared/config/webtoon/const";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { formatCount } from "@/shared/lib/format/format-count";
import { Box, Skeleton, Stack } from "@mui/material";
import { EvaHeartOutlineIcon, NineteenCircleIcon, RichCard, toast } from "@pency/ui/components";
import { forwardRef } from "react";

// ----------------------------------------------------------------------

type WtSeriesRichCardFnProps = {
  data: {
    id: number;
    thumbnail: string | null;
    age: Age;
    creationType: CreationType;
    pair: Pair;
    genre: Genre;
    seriesType: SeriesType;
    title: string;
    channel: {
      url: string;
      image: string | null;
      title: string;
    };
    episodeCount: number;
    likeCount: number;
    keywords: string[];
  };
  feedbackButton: React.ReactElement;
};

const WtSeriesRichCardFn = forwardRef<HTMLDivElement, WtSeriesRichCardFnProps>(({ data, feedbackButton }, ref) => {
  return (
    <RichCard
      ref={ref}
      slots={{
        overlayElement: <RichCard.OverlayAnchor href={`/${formatChannelUrl(data.channel.url)}/webtoon/${data.id}`} />,
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
            <RichCard.Label variant="soft" color="primary">
              {CREATION_TYPE_LABEL[data.creationType]}
            </RichCard.Label>
            {data.pair !== "NONE" ? (
              <RichCard.Label variant="soft" color="secondary">
                {PAIR_LABEL[data.pair]}
              </RichCard.Label>
            ) : null}
            <RichCard.Label variant="soft" color="warning">
              {GENRE_LABEL[data.genre]}
            </RichCard.Label>
            <RichCard.Label variant="soft" color="warning">
              {SERIES_TYPE_LABEL[data.seriesType]}
            </RichCard.Label>
          </>
        ),
        avatarLink: (
          <RichCard.AvatarLink
            href={`/${formatChannelUrl(data.channel.url)}`}
            slots={{
              avatar: <RichCard.AvatarLink.Avatar src={data.channel.image} />,
            }}
          />
        ),
        title: <RichCard.Title>{data.title}</RichCard.Title>,
        nameLink: (
          <RichCard.NameLink href={`/${formatChannelUrl(data.channel.url)}`}>{data.channel.title}</RichCard.NameLink>
        ),
        attributes: (
          <>
            <RichCard.AttributeDot />
            <RichCard.Attribute>총 {data.episodeCount}</RichCard.Attribute>
            <RichCard.AttributeDot />
            <RichCard.Attribute>
              <EvaHeartOutlineIcon />
              {formatCount(data.likeCount)}
            </RichCard.Attribute>
          </>
        ),
        feedbackButton,
        chips: (
          <>
            {data.keywords.length
              ? data.keywords.map((keyword, i) => (
                  <RichCard.Chip
                    key={i}
                    label={keyword}
                    variant="soft"
                    size="small"
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.warning("TODO");
                    }}
                  />
                ))
              : null}
          </>
        ),
      }}
    />
  );
});

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

export const WtSeriesRichCard = Object.assign(WtSeriesRichCardFn, {
  Loading: LoadingFn,
});
