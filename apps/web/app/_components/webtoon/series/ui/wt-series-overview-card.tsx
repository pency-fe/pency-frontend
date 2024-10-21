import { Genre, GENRE_LABEL } from "_components/webtoon/const";
import { forwardRef } from "react";
import { COMPLETION_STATE, CompletionState } from "../const";
import { OverviewCard } from "@pency/ui/components";

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
  };
};

export const WT_Series_OverviewCard = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  return (
    <OverviewCard
      ref={ref}
      slots={{
        overlayElement: <OverviewCard.OverlayAnchor href={`/webtoon/series/${data.seriesId}`} />,
        thumbnail: (
          <OverviewCard.Thumbnail
            slots={{
              image: <OverviewCard.Thumbnail.Image src={data.thumbnail} sx={{ aspectRatio: "16/9" }} />,
            }}
          />
        ),
        labels: (
          <>
            <OverviewCard.Label variant="soft" color="warning">
              {GENRE_LABEL[data.genre]}
            </OverviewCard.Label>
            <OverviewCard.Label variant="soft" color="info">
              {COMPLETION_STATE[data.completionState]}
            </OverviewCard.Label>
          </>
        ),
        avatarLink: (
          <OverviewCard.AvatarLink
            href={`/channel/${data.channel.channelId}`}
            slots={{
              avatar: <OverviewCard.AvatarLink.Avatar src={data.channel.avatar} />,
            }}
          />
        ),
        title: <OverviewCard.Title>{data.title}</OverviewCard.Title>,
        nameLink: (
          <OverviewCard.NameLink href={`/channel/${data.channel.channelId}`}>{data.channel.name}</OverviewCard.NameLink>
        ),
      }}
    />
  );
});
