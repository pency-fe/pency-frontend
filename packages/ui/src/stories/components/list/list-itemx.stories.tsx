import { EvaHeartOutlineIcon, ListItemx, NineteenCircleIcon } from "@/components";
import { Meta } from "@storybook/react";

const meta: Meta = {
  title: "components/list/ListItemx",
};

export default meta;

const postData = {
  id: 123,
  thumbnail:
    "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
  age: "NINETEEN",
  // title: "천재 궁수의 스트리밍1 천재 궁수의 스트리밍2 천재 궁수의 스트리밍3 천재 궁수의 스트리밍4",
  title: "천재 궁수의 스트리밍",
  channel: {
    channelUrl: "dddddd",
    name: "김천재의 채널",
  },
  likeCount: 100,
};

export const PostListItemx = () => {
  return (
    <>
      <ListItemx
        slots={{
          overlayElement: (
            <ListItemx.OverlayAnchor href={`/@${postData.channel.channelUrl}/webtoon/post/${postData.id}`} />
          ),
          thumbnail: (
            <ListItemx.Thumbnail
              slots={{
                image: <ListItemx.Thumbnail.Image src={postData.thumbnail} />,
                // image: <ListItemx.Thumbnail.Image src={null} />,
                topEnd: postData.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
              }}
              sx={{ aspectRatio: "16/9" }}
            />
          ),
          order: (
            <ListItemx.Order variant="soft" color="info">
              1
            </ListItemx.Order>
          ),
          title: <ListItemx.Title>{postData.title}</ListItemx.Title>,
          attribute: (
            <ListItemx.Attribute>
              {postData.channel.name}
              <ListItemx.Attribute.Dot />
              <EvaHeartOutlineIcon />
              {postData.likeCount}
            </ListItemx.Attribute>
          ),
        }}
      />
    </>
  );
};

export const PostListItemxs = () => {
  return (
    <>
      <PostListItemx />
      <PostListItemx />
      <PostListItemx />
      <PostListItemx />
    </>
  );
};

// ----------------------------------------------------------------------

export const SeriesListItemx = () => {
  const seriesData = {
    seriesId: "series-id-123",
    thumbnail:
      "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
    genre: "액션",
    completionState: "연재",
    title: "천재 궁수의 스트리밍",
    channel: {
      channelUrl: "channel-id-123",
      avatar: "https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png",
      name: "김천재의 채널",
    },
    likeCount: 100,
    postCount: 24,
    keywords: ["BL", "**공", "**수", "판타지", "학원물", "고수위", "후방주의", "유혈"],
  };
  return (
    <ListItemx
      slots={{
        overlayElement: <ListItemx.OverlayAnchor href={`/webtoon/series/${seriesData.seriesId}`} />,
        thumbnail: (
          <ListItemx.Thumbnail
            slots={{
              image: <ListItemx.Thumbnail.Image src={seriesData.thumbnail} />,
              // image: <ListItemx.Thumbnail.Image src={null} />,
            }}
            sx={{ aspectRatio: "16/9" }}
          />
        ),
        order: (
          <ListItemx.Order variant="soft" color="info">
            1
          </ListItemx.Order>
        ),

        title: <ListItemx.Title>{seriesData.title}</ListItemx.Title>,
        attribute: (
          <ListItemx.Attribute>
            {postData.channel.name}
            <ListItemx.Attribute.Dot />
            {`총 ${seriesData.postCount}화`}
          </ListItemx.Attribute>
        ),
      }}
    />
  );
};
