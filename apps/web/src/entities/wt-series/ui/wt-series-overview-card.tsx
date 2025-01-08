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
import { Box, Skeleton, Stack } from "@mui/material";
import { NineteenCircleIcon, OverviewCard } from "@pency/ui/components";
import { forwardRef } from "react";

// ----------------------------------------------------------------------

type WtSeriesOverviewCardFnProps = {
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
  };
};

const WtSeriesOverviewCardFn = forwardRef<HTMLDivElement, WtSeriesOverviewCardFnProps>(({ data }, ref) => {
  return (
    <OverviewCard
      ref={ref}
      slots={{
        overlayElement: (
          <OverviewCard.OverlayAnchor href={`/${formatChannelUrl(data.channel.url)}/webtoon/${data.id}`} />
        ),
        thumbnail: (
          <OverviewCard.Thumbnail
            slots={{
              image: <OverviewCard.Thumbnail.Image src={data.thumbnail} />,
              topEnds: data.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
            }}
            sx={{ aspectRatio: "16/9" }}
          />
        ),
        labels: (
          <>
            <OverviewCard.Label variant="soft" color="primary">
              {CREATION_TYPE_LABEL[data.creationType]}
            </OverviewCard.Label>
            {PAIR_LABEL[data.pair] !== "없음" ? (
              <OverviewCard.Label variant="soft" color="secondary">
                {PAIR_LABEL[data.pair]}
              </OverviewCard.Label>
            ) : null}
            <OverviewCard.Label variant="soft" color="warning">
              {GENRE_LABEL[data.genre]}
            </OverviewCard.Label>
            <OverviewCard.Label variant="soft" color="warning">
              {SERIES_TYPE_LABEL[data.seriesType]}
            </OverviewCard.Label>
          </>
        ),
        avatarLink: (
          <OverviewCard.AvatarLink
            href={`/${formatChannelUrl(data.channel.url)}`}
            slots={{
              avatar: <OverviewCard.AvatarLink.Avatar src={data.channel.image} />,
            }}
          />
        ),
        title: <OverviewCard.Title>{data.title}</OverviewCard.Title>,
        nameLink: (
          <OverviewCard.NameLink href={`/${formatChannelUrl(data.channel.url)}`}>
            {data.channel.title}
          </OverviewCard.NameLink>
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

export const WtSeriesOverviewCard = Object.assign(WtSeriesOverviewCardFn, {
  Loading: LoadingFn,
});
