"use client";

import { forwardRef } from "react";
import { GravityUiCircleCheckFillIcon, NineteenCircleIcon, OverviewCard } from "@pency/ui/components";
import { Age, CreationType, CREATION_TYPE_LABEL, Pair, PAIR_LABEL } from "../const";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";

type Props = {
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
  };
  hideGenre?: boolean;
};

export const WT_Post_OverviewCard = forwardRef<HTMLDivElement, Props>(({ data, hideGenre = false }, ref) => {
  return (
    <OverviewCard
      ref={ref}
      slots={{
        overlayElement: <OverviewCard.OverlayAnchor href={`/@${data.channel.url}/webtoon/post/${data.id}`} />,
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
            {data.price ? (
              <OverviewCard.Label
                variant="soft"
                color="success"
                slots={{ startIcon: data.purchased ? <GravityUiCircleCheckFillIcon /> : null }}
              >
                {data.price}P
              </OverviewCard.Label>
            ) : null}
            <OverviewCard.Label variant="soft" color="secondary">
              {CREATION_TYPE_LABEL[data.creationType]}
            </OverviewCard.Label>
            {PAIR_LABEL[data.pair] !== "없음" ? (
              <OverviewCard.Label variant="soft" color="warning">
                {PAIR_LABEL[data.pair]}
              </OverviewCard.Label>
            ) : null}

            {!hideGenre ? (
              <OverviewCard.Label variant="soft" color="warning">
                {GENRE_LABEL[data.genre]}
              </OverviewCard.Label>
            ) : null}
          </>
        ),
        avatarLink: (
          <OverviewCard.AvatarLink
            href={`/@${data.channel.url}`}
            slots={{
              avatar: <OverviewCard.AvatarLink.Avatar src={data.channel.image} />,
            }}
          />
        ),
        title: <OverviewCard.Title>{data.title}</OverviewCard.Title>,
        nameLink: <OverviewCard.NameLink href={`/@${data.channel.url}`}>{data.channel.title}</OverviewCard.NameLink>,
      }}
    />
  );
});
