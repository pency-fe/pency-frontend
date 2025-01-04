"use client";

import { ComponentProps, ComponentType, forwardRef } from "react";
import { Box, Skeleton, Stack } from "@mui/material";
import {
  EvaHeartOutlineIcon,
  EvaMoreVerticalOutlineIcon,
  GravityUiCircleCheckFillIcon,
  Menux,
  NineteenCircleIcon,
  RichCard,
  useMenuxState,
} from "@pency/ui/components";
import {
  Age,
  CREATION_TYPE_LABEL,
  CreationType,
  Genre,
  GENRE_LABEL,
  Pair,
  PAIR_LABEL,
} from "@/shared/config/webtoon/const";
import { formatCount } from "@/shared/lib/format/format-count";
import { formatElapsedTime } from "@/shared/lib/format/format-elapsed-time";

type WtPostRichCardFnProps = {
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
    publishedAt: number;
    keywords: string[];
    bookmark: boolean;
    block: boolean;
  };
  Menu: ComponentType<{ data: WtPostRichCardFnProps["data"] } & ComponentProps<typeof Menux>>;
  hideGenre?: boolean;
};

const WtPostRichCardFn = forwardRef<HTMLDivElement, WtPostRichCardFnProps>(({ data, hideGenre = false, Menu }, ref) => {
  const { anchorRef, isOpen, close, toggle } = useMenuxState();

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
              {formatCount(data.likeCount)}
            </RichCard.Attribute>
            <RichCard.AttributeDot />
            <RichCard.Attribute>{formatElapsedTime(data.publishedAt)}</RichCard.Attribute>
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

export const WtPostRichCard = Object.assign(WtPostRichCardFn, {
  Loading: LoadingFn,
});
