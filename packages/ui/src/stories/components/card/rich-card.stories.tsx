import {
  EvaHeartOutlineIcon,
  GravityUiCircleCheckFillIcon,
  EvaMoreVerticalOutlineIcon,
  EvaChevronDownOutlineIcon,
  NineteenCircleIcon,
  RichCard,
} from "@/components";
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
    likeCount: 100,
    createAt: "24.10.31",
    keywords: ["BL", "**공", "**수", "판타지", "학원물", "고수위", "후방주의", "유혈"],
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
        attributes: (
          <>
            <RichCard.AttributeDot />
            <RichCard.Attribute>
              <EvaHeartOutlineIcon />
              {postData.likeCount}
            </RichCard.Attribute>
            <RichCard.AttributeDot />
            <RichCard.Attribute>{postData.createAt}</RichCard.Attribute>
          </>
        ),
        feedbackButton: (
          <RichCard.FeedbackButton>
            <EvaMoreVerticalOutlineIcon />
          </RichCard.FeedbackButton>
        ),
        chips: (
          <>
            {Array.from(postData.keywords, (keyword, i) => (
              <RichCard.Chip key={i} label={keyword} variant="soft" size="small" href={`/search?keyword=${keyword}`} />
            ))}
          </>
        ),
        accordion: (
          <RichCard.Accordion
            slots={{
              summary: (
                <RichCard.Accordion.Summary expandIcon={<EvaChevronDownOutlineIcon />}>
                  미리보기
                </RichCard.Accordion.Summary>
              ),
              details: (
                <RichCard.Accordion.Details>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                  blandit leo lobortis eget.
                </RichCard.Accordion.Details>
              ),
            }}
          />
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
    likeCount: 100,
    postCount: 24,
    keywords: ["BL", "**공", "**수", "판타지", "학원물", "고수위", "후방주의", "유혈"],
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
        attributes: (
          <>
            <RichCard.AttributeDot />
            <RichCard.Attribute>
              <RichCard.Attribute>{`총 ${seriesData.postCount}화`}</RichCard.Attribute>
            </RichCard.Attribute>
            <RichCard.AttributeDot />
            <RichCard.Attribute>
              <EvaHeartOutlineIcon />
              {seriesData.likeCount}
            </RichCard.Attribute>
          </>
        ),
        feedbackButton: (
          <RichCard.FeedbackButton>
            <EvaMoreVerticalOutlineIcon />
          </RichCard.FeedbackButton>
        ),
        chips: (
          <>
            {Array.from(seriesData.keywords, (keyword, i) => (
              <RichCard.Chip key={i} label={keyword} variant="soft" size="small" href={`/search?keyword=${keyword}`} />
            ))}
          </>
        ),
      }}
    />
  );
};
