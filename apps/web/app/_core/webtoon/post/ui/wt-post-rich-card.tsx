import { forwardRef } from "react";
import {
  EvaHeartOutlineIcon,
  EvaMoreVerticalOutlineIcon,
  GravityUiCircleCheckFillIcon,
  MingcuteDownLineIcon,
  NineteenCircleIcon,
  RichCard,
} from "@pency/ui/components";
import { Age, CreationType, CREATION_TYPE_LABEL, Pair, PAIR_LABEL } from "../const";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { Box } from "@mui/material";
import { maxLine } from "@pency/ui/util";
import { formatRelativeTimeFromUTC } from "@pency/util";

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
      channelId: string;
      avatar: string;
      name: string;
    };
    likeCount: number;
    createdAt: number;
    keywords: string[];
    preview: string;
  };
};

export const WT_Post_RichCard = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  return (
    <RichCard
      ref={ref}
      slots={{
        overlayElement: <RichCard.OverlayAnchor href={`/webtoon/post/${data.postId}`} />,
        thumbnail: (
          <RichCard.Thumbnail
            slots={{
              image: <RichCard.Thumbnail.Image src={data.thumbnail} sx={{ aspectRatio: "16/9" }} />,
              topEnds: data.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
            }}
          />
        ),
        labels: (
          <>
            {data.price && (
              <RichCard.Label
                variant="soft"
                color="success"
                slots={{ startIcon: data.purchased ? <GravityUiCircleCheckFillIcon /> : null }}
              >
                {data.price}P
              </RichCard.Label>
            )}
            <RichCard.Label variant="soft" color="secondary">
              {CREATION_TYPE_LABEL[data.creationType]}
            </RichCard.Label>
            <RichCard.Label variant="soft" color="warning">
              {PAIR_LABEL[data.pair]}
            </RichCard.Label>
            <RichCard.Label variant="soft" color="warning">
              {GENRE_LABEL[data.genre]}
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
              <EvaHeartOutlineIcon />
              {data.likeCount}
            </RichCard.Attribute>
            <RichCard.AttributeDot />
            <RichCard.Attribute>{formatRelativeTimeFromUTC(data.createdAt)}</RichCard.Attribute>
          </>
        ),
        feedbackButton: (
          <RichCard.FeedbackButton>
            <EvaMoreVerticalOutlineIcon />
          </RichCard.FeedbackButton>
        ),
        chips: (
          <>
            {data.keywords.length
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
        accordion: (
          <>
            {data.preview.trim().length ? (
              <RichCard.Accordion
                slots={{
                  summary: (
                    <RichCard.Accordion.Summary expandIcon={<MingcuteDownLineIcon />}>
                      미리보기
                    </RichCard.Accordion.Summary>
                  ),
                  details: (
                    <RichCard.Accordion.Details>
                      <Box sx={{ ...maxLine({ line: 4 }) }}>{data.preview}</Box>
                    </RichCard.Accordion.Details>
                  ),
                }}
              />
            ) : null}
          </>
        ),
      }}
    />
  );
});
