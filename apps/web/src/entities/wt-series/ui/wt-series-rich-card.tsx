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
import { formatCount } from "@/shared/lib/format/format-count";
import { formatElapsedTime } from "@/shared/lib/format/format-elapsed-time";
import { Box, Skeleton, Stack } from "@mui/material";
import {
  EvaHeartOutlineIcon,
  EvaMoreVerticalOutlineIcon,
  Menux,
  NineteenCircleIcon,
  RichCard,
  useMenuxState,
} from "@pency/ui/components";
import { ComponentProps, ComponentType, forwardRef } from "react";

// ----------------------------------------------------------------------

type WtSeriesRichCardFnProps = {
  data: {
    id: number;
    thumbnail: string;
    age: Age;
    creationType: CreationType;
    pair: Pair;
    genre: Genre;
    seriesType: SeriesType;
    title: string;
    channel: {
      channelUrl: string;
      avatar: string;
      name: string;
    };
    episodeCount: number;
    likeCount: number;
    keywords: string[];
  };
  Menu: ComponentType<{ data: WtSeriesRichCardFnProps["data"] } & ComponentProps<typeof Menux>>;
};

const WtSeriesRichCardFn = forwardRef<HTMLDivElement, WtSeriesRichCardFnProps>(({ data, Menu }, ref) => {
  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  return (
    <RichCard
      ref={ref}
      slots={{
        overlayElement: <RichCard.OverlayAnchor href={`/${data.channel.channelUrl}/webtoon/${data.id}`} />,
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
            href={`/${data.channel.channelUrl}`}
            slots={{
              avatar: <RichCard.AvatarLink.Avatar src={data.channel.avatar} />,
            }}
          />
        ),
        title: <RichCard.Title>{data.title}</RichCard.Title>,
        nameLink: <RichCard.NameLink href={`/${data.channel.channelUrl}`}>{data.channel.name}</RichCard.NameLink>,
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
        feedbackButton: (
          <>
            <RichCard.FeedbackButton ref={anchorRef} onClick={toggle}>
              <EvaMoreVerticalOutlineIcon />
            </RichCard.FeedbackButton>
            <Menu data={data} open={isOpen} anchorEl={anchorRef.current} placement="left-start" onClose={close} />
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
