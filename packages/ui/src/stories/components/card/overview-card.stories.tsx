import { GravityUiCircleCheckFillIcon, NineteenCircleIcon, OverviewCard } from "../../../components";
import { Meta } from "@storybook/react";

const meta: Meta = {
  title: "components/card/OverviewCard",
};

export default meta;

// ----------------------------------------------------------------------

export const WtSeriesOverviewCard = () => {
  const seriesData = {
    seriesId: "series-id-123",
    thumbnail:
      "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
    age: "NINETEEN",
    genre: "액션",
    creationType: "2차창작",
    pair: "BL",
    status: "연재",
    title: "천재 궁수의 스트리밍",
    channel: {
      channelUrl: "channel-id-123",
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
              image: <OverviewCard.Thumbnail.Image src={seriesData.thumbnail} />,
              // image: <OverviewCard.Thumbnail.Image src={null} />,
              topEnds: seriesData.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
            }}
            sx={{ aspectRatio: "16/9" }}
          />
        ),
        labels: (
          <>
            <OverviewCard.Label variant="soft" color="primary">
              {seriesData.genre}
            </OverviewCard.Label>
            <OverviewCard.Label variant="soft" color="secondary">
              {seriesData.creationType}
            </OverviewCard.Label>
            <OverviewCard.Label variant="soft" color="warning">
              {seriesData.pair}
            </OverviewCard.Label>
            <OverviewCard.Label variant="soft" color="warning">
              {seriesData.status}
            </OverviewCard.Label>
          </>
        ),
        avatarLink: (
          <OverviewCard.AvatarLink
            href={`/@${seriesData.channel.channelUrl}`}
            slots={{
              avatar: <OverviewCard.AvatarLink.Avatar src={seriesData.channel.avatar} />,
            }}
          />
        ),
        title: <OverviewCard.Title>{seriesData.title}</OverviewCard.Title>,
        nameLink: (
          <OverviewCard.NameLink href={`/@${seriesData.channel.channelUrl}`}>
            {seriesData.channel.name}
          </OverviewCard.NameLink>
        ),
      }}
    />
  );
};

// ----------------------------------------------------------------------

export const PostOverviewCard = () => {
  const postData = {
    id: 123,
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
      channelUrl: "channel-id-123",
      avatar: "https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png",
      name: "김천재의 채널",
    },
  };

  return (
    <OverviewCard
      slots={{
        overlayElement: (
          <OverviewCard.OverlayAnchor href={`/@${postData.channel.channelUrl}/webtoon/post/${postData.id}`} />
        ),
        thumbnail: (
          <OverviewCard.Thumbnail
            slots={{
              // image: <OverviewCard.Thumbnail.Image src={postData.thumbnail} />,
              image: <OverviewCard.Thumbnail.Image src={null} />,

              topEnds: postData.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
            }}
            sx={{ aspectRatio: "16/9" }}
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
            href={`/@${postData.channel.channelUrl}`}
            slots={{
              // avatar: <OverviewCard.AvatarLink.Avatar src={postData.channel.avatar} />,
              avatar: <OverviewCard.AvatarLink.Avatar src={null} />,
            }}
          />
        ),
        title: <OverviewCard.Title>{postData.title}</OverviewCard.Title>,
        nameLink: (
          <OverviewCard.NameLink href={`/@${postData.channel.channelUrl}`}>
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
    status: "연재",
    title: "천재 궁수의 스트리밍",
    channel: {
      channelUrl: "channel-id-123",
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
              image: <OverviewCard.Thumbnail.Image src={seriesData.thumbnail} />,
              // image: <OverviewCard.Thumbnail.Image src={null} />,
            }}
            sx={{ aspectRatio: "16/9" }}
          />
        ),
        labels: (
          <>
            <OverviewCard.Label variant="soft" color="warning">
              {seriesData.genre}
            </OverviewCard.Label>
            <OverviewCard.Label variant="soft" color="info">
              {seriesData.status}
            </OverviewCard.Label>
          </>
        ),
        avatarLink: (
          <OverviewCard.AvatarLink
            href={`/@${seriesData.channel.channelUrl}`}
            slots={{
              avatar: <OverviewCard.AvatarLink.Avatar src={seriesData.channel.avatar} />,
            }}
          />
        ),
        title: <OverviewCard.Title>{seriesData.title}</OverviewCard.Title>,
        nameLink: (
          <OverviewCard.NameLink href={`/@${seriesData.channel.channelUrl}`}>
            {seriesData.channel.name}
          </OverviewCard.NameLink>
        ),
      }}
    />
  );
};
