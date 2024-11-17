import { EvaHeartOutlineIcon, ListCard, NineteenCircleIcon } from "@/components";
import { Meta } from "@storybook/react";

const meta: Meta = {
  title: "components/card/ListCard",
};

export default meta;

const postData = {
  postId: "post-id-123",
  thumbnail:
    "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
  age: "NINETEEN",
  title: "천재 궁수의 스트리밍1 천재 궁수의 스트리밍2 천재 궁수의 스트리밍3 천재 궁수의 스트리밍4",
  // title: "천재 궁수의 스트리밍",
  channel: {
    name: "김천재의 채널",
  },
  likeCount: 100,
};

export const PostListCard = () => {
  return (
    <>
      <ListCard
        slots={{
          overlayElement: <ListCard.OverlayAnchor href={`/webtoon/post/${postData.postId}`} />,
          thumbnail: (
            <ListCard.Thumbnail
              slots={{
                image: <ListCard.Thumbnail.Image src={postData.thumbnail} sx={{ aspectRatio: "16/9" }} />,
                topEnds: postData.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
              }}
            />
          ),
          rank: (
            <>
              <ListCard.Rank variant="soft" color="primary">
                1
              </ListCard.Rank>
            </>
          ),
          title: <ListCard.Title>{postData.title}</ListCard.Title>,
          name: <ListCard.Name>{postData.channel.name}</ListCard.Name>,
          attributes: (
            <>
              <ListCard.AttributeDot />
              <ListCard.Attribute>
                <EvaHeartOutlineIcon />
                {postData.likeCount}
              </ListCard.Attribute>
            </>
          ),
        }}
      />
    </>
  );
};

export const PostListCards = () => {
  return (
    <>
      <PostListCard />
      <PostListCard />
      <PostListCard />
      <PostListCard />
    </>
  );
};

// ----------------------------------------------------------------------

export const SeriesListCard = () => {
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
    likeCount: 100,
    postCount: 24,
    keywords: ["BL", "**공", "**수", "판타지", "학원물", "고수위", "후방주의", "유혈"],
  };
  return (
    <ListCard
      slots={{
        overlayElement: <ListCard.OverlayAnchor href={`/webtoon/series/${seriesData.seriesId}`} />,
        thumbnail: (
          <ListCard.Thumbnail
            slots={{
              image: <ListCard.Thumbnail.Image src={seriesData.thumbnail} sx={{ aspectRatio: "16/9" }} />,
            }}
          />
        ),
        rank: (
          <>
            <ListCard.Rank variant="soft" color="primary">
              1
            </ListCard.Rank>
          </>
        ),

        title: <ListCard.Title>{seriesData.title}</ListCard.Title>,
        name: <ListCard.Name>{seriesData.channel.name}</ListCard.Name>,
        attributes: (
          <>
            <ListCard.AttributeDot />
            <ListCard.Attribute>
              <ListCard.Attribute>{`총 ${seriesData.postCount}화`}</ListCard.Attribute>
            </ListCard.Attribute>
          </>
        ),
      }}
    />
  );
};
