import { GravityUiCircleCheckFillIcon, NineteenCircleIcon, RichCard } from "@/components";
import { Meta } from "@storybook/react";

const meta: Meta = {
  title: "components/card/RichCard",
};

export default meta;

export const PostRichCard = () => {
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
    title: "천재 궁수의 스트리밍1 천재 궁수의 스트리밍2 천재 궁수의 스트리밍3 천재 궁수의 스트리밍4",
    // title: "천재 궁수의 스트리밍",
    channel: {
      channelId: "channel-id-123",
      avatar: "https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png",
      name: "김천재의 채널",
    },
    keywords: ["BL", "**공", "**수", "판타지", "학원물", "고수위", "후방주의", "유혈", "심신미약자_주의"],
  };
  return (
    <RichCard
      slots={{
        overlayElement: <RichCard.OverlayAnchor href={`/webtoon/post/${postData.postId}`} />,
        thumbnail: (
          <RichCard.Thumbnail
            slots={{
              image: <RichCard.Thumbnail.Image src={postData.thumbnail} sx={{ aspectRatio: "16/9" }} />,
              topEnds: postData.age === "NINETEEN" ? <NineteenCircleIcon /> : null,
            }}
          />
        ),
        labels: (
          <>
            {postData.price && (
              <RichCard.Label
                variant="soft"
                color="primary"
                slots={{ startIcon: postData.purchased ? <GravityUiCircleCheckFillIcon /> : null }}
              >
                {postData.price}P
              </RichCard.Label>
            )}
            <RichCard.Label variant="soft" color="secondary">
              {postData.creationType}
            </RichCard.Label>
            <RichCard.Label variant="soft" color="warning">
              {postData.pair}
            </RichCard.Label>
            <RichCard.Label variant="soft" color="warning">
              {postData.genre}
            </RichCard.Label>
          </>
        ),
        avatarLink: (
          <RichCard.AvatarLink
            href={`/channel/${postData.channel.channelId}`}
            slots={{
              avatar: <RichCard.AvatarLink.Avatar src={postData.channel.avatar} />,
            }}
          />
        ),
        title: <RichCard.Title>{postData.title}</RichCard.Title>,
        nameLink: (
          <RichCard.NameLink href={`/channel/${postData.channel.channelId}`}>{postData.channel.name}</RichCard.NameLink>
        ),
        chips: (
          <>
            {Array.from(postData.keywords, (v, i) => (
              // [TODO] 검색 주소 넣기
              <RichCard.Chip key={i} label={v} variant="soft" size="small" href={`/${v}`} />
            ))}
          </>
        ),
      }}
    />
  );
};

// ----------------------------------------------------------------------

export const SeriesRichCard = () => {
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
    <RichCard
      slots={{
        overlayElement: <RichCard.OverlayAnchor href={`/webtoon/series/${seriesData.seriesId}`} />,
        thumbnail: (
          <RichCard.Thumbnail
            slots={{
              image: <RichCard.Thumbnail.Image src={seriesData.thumbnail} sx={{ aspectRatio: "16/9" }} />,
            }}
          />
        ),
        labels: (
          <>
            <RichCard.Label variant="soft" color="warning">
              {seriesData.genre}
            </RichCard.Label>
            <RichCard.Label variant="soft" color="info">
              {seriesData.completionState}
            </RichCard.Label>
          </>
        ),
        avatarLink: (
          <RichCard.AvatarLink
            href={`/channel/${seriesData.channel.channelId}`}
            slots={{
              avatar: <RichCard.AvatarLink.Avatar src={seriesData.channel.avatar} />,
            }}
          />
        ),
        title: <RichCard.Title>{seriesData.title}</RichCard.Title>,
        nameLink: (
          <RichCard.NameLink href={`/channel/${seriesData.channel.channelId}`}>
            {seriesData.channel.name}
          </RichCard.NameLink>
        ),
      }}
    />
  );
};
