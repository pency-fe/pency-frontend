import { GravityUiCircleCheckFillIcon, NineteenCircleIcon, OverviewCard } from "@/components";
import { Meta } from "@storybook/react";

const meta: Meta = {
  title: "components/card/OverviewCard",
};

export default meta;

export const PostOverviewCard = () => {
  const postData = {
    postId: "post-id-123",
    thumbnail:
      "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
    age: "NINETEEN",
    price: 300,
    purchased: true,
    creationType: "2차창작",
    pair: "BL",
    genre: "액션",
    title: "천재 궁수의 스트리밍",
    channel: {
      channelId: "channel-id-123",
      avatar: "https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png",
      name: "김천재의 채널",
    },
  };
  return (
    <OverviewCard
      slots={{
        overlayElement: <OverviewCard.OverlayAnchor href={`/webtoon/post/${postData.postId}`} />,
        thumbnail: (
          <OverviewCard.Thumbnail
            slots={{
              image: <OverviewCard.Thumbnail.Image src={postData.thumbnail} sx={{ aspectRatio: "16/9" }} />,
              topEnds: postData.age === "NINETEEN" ? <NineteenCircleIcon /> : null,
            }}
          />
        ),
        labels: (
          <>
            {postData.price && (
              <OverviewCard.Label
                variant="soft"
                color="primary"
                slots={{ startIcon: postData.purchased ? <GravityUiCircleCheckFillIcon /> : null }}
              >
                {postData.price}P
              </OverviewCard.Label>
            )}
            <OverviewCard.Label variant="soft" color="secondary">
              {postData.creationType}
            </OverviewCard.Label>
            <OverviewCard.Label variant="soft" color="warning">
              {postData.pair}
            </OverviewCard.Label>
            <OverviewCard.Label variant="soft" color="warning">
              {postData.genre}
            </OverviewCard.Label>
          </>
        ),
        avatarLink: (
          <OverviewCard.AvatarLink
            href={`/channel/${postData.channel.channelId}`}
            slots={{
              avatar: <OverviewCard.AvatarLink.Avatar src={postData.channel.avatar} />,
            }}
          />
        ),
        title: <OverviewCard.Title>{postData.title}</OverviewCard.Title>,
        nameLink: (
          <OverviewCard.NameLink href={`/channel/${postData.channel.channelId}`}>
            {postData.channel.name}
          </OverviewCard.NameLink>
        ),
      }}
    />
  );
};

// ----------------------------------------------------------------------

export const SeriesOverviewCard = () => {
  const seriesData = {
    seriesId: "series-id-123",
    thumbnail:
      "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
    genre: "액션",
    completionState: "연재",
    title: "천재 궁수의 스트리밍",
    channel: {
      channelId: "channel-id-123",
      avatar: "https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png",
      name: "김천재의 채널",
    },
  };
  return (
    <OverviewCard
      slots={{
        overlayElement: <OverviewCard.OverlayAnchor href={`/webtoon/series/${seriesData.seriesId}`} />,
        thumbnail: (
          <OverviewCard.Thumbnail
            slots={{
              image: <OverviewCard.Thumbnail.Image src={seriesData.thumbnail} sx={{ aspectRatio: "16/9" }} />,
            }}
          />
        ),
        labels: (
          <>
            <OverviewCard.Label variant="soft" color="warning">
              {seriesData.genre}
            </OverviewCard.Label>
            <OverviewCard.Label variant="soft" color="info">
              {seriesData.completionState}
            </OverviewCard.Label>
          </>
        ),
        avatarLink: (
          <OverviewCard.AvatarLink
            href={`/channel/${seriesData.channel.channelId}`}
            slots={{
              avatar: <OverviewCard.AvatarLink.Avatar src={seriesData.channel.avatar} />,
            }}
          />
        ),
        title: <OverviewCard.Title>{seriesData.title}</OverviewCard.Title>,
        nameLink: (
          <OverviewCard.NameLink href={`/channel/${seriesData.channel.channelId}`}>
            {seriesData.channel.name}
          </OverviewCard.NameLink>
        ),
      }}
    />
  );
};
