import {
  EvaHeartOutlineIcon,
  GravityUiCircleCheckFillIcon,
  EvaMoreVerticalOutlineIcon,
  MingcuteDownLineIcon,
  NineteenCircleIcon,
  RichCard,
  useMenuxState,
  Menux,
  EvaBookmarkOutlineIcon,
  FluentShare24RegularIcon,
  MaterialSymbolsReportOutlineIcon,
  MaterialSymbolsBlockIcon,
} from "../../../components";
import { maxLine } from "../../../util";

import { Box, ListItemIcon, MenuItem } from "@mui/material";
import { formatCount, formatElapsedTime } from "@pency/util";
import { Meta } from "@storybook/react";

// ----------------------------------------------------------------------

const meta: Meta = {
  title: "components/card/RichCard",
};

export default meta;

// ----------------------------------------------------------------------

const postData = {
  id: 123,
  // thumbnail:
  //   "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
  thumbnail: null,
  age: "NINETEEN",
  price: 300,
  purchased: true,
  creationType: "2차창작",
  pair: "BL",
  genre: "액션",
  title: "천재 궁수의 스트리밍1 천재 궁수의 스트리밍2 천재 궁수의 스트리밍3 천재 궁수의 스트리밍4",
  // title: "천재 궁수의 스트리밍",
  channel: {
    channelUrl: "channel-id-123",
    avatar: "https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png",
    name: "김천재의 채널",
  },
  likeCount: 100,
  publishedAt: 1730535831,
  keywords: ["BL", "**공", "**수", "판타지", "학원물", "고수위", "후방주의", "유혈"],
  preview:
    "선수권 대회 최연소 우승, 양궁 유망주.\n\n승승장구 하는 줄 알았으나 비운의 사고로 \n다시는 활을 쥘 수 없게 된 몰락한 천재 양궁 선수 유상현!\n\n낙하산으로 들어간 회사에서마저 잘린 그는,\n먹고살기 위해 게임 스트리머, 아몬드가 되는데...\n\n[활을 선택하셨습니다.]\n\n피융! 푸욱!\n\n[헤드샷!]\n\n“보스 원래 한 방이에요?”\n\n미친 재능이 다시금 빛을 발한다!\n\n28살. 고졸. 백수.\n특기는 양궁.\n\n방송 천재가 되어 돌아온, 그의 유쾌한 반란이 시작된다?!\n\n[천재 궁수의 스트리밍]",
};

// ----------------------------------------------------------------------

export const PostRichCard = () => {
  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  return (
    <>
      <RichCard
        slots={{
          overlayElement: (
            <RichCard.OverlayAnchor href={`/@${postData.channel.channelUrl}/webtoon/post/${postData.id}`} />
          ),
          thumbnail: (
            <RichCard.Thumbnail
              slots={{
                // image: <RichCard.Thumbnail.Image src={postData.thumbnail} />,
                image: <RichCard.Thumbnail.Image src={null} />,
                topEnds: postData.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
              }}
              sx={{ aspectRatio: "16/9" }}
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
              href={`/@${postData.channel.channelUrl}`}
              slots={{
                // avatar: <RichCard.AvatarLink.Avatar src={postData.channel.avatar} />,
                avatar: <RichCard.AvatarLink.Avatar src={null} />,
              }}
            />
          ),
          title: <RichCard.Title>{postData.title}</RichCard.Title>,
          nameLink: (
            <RichCard.NameLink href={`/@${postData.channel.channelUrl}`}>{postData.channel.name}</RichCard.NameLink>
          ),
          attributes: (
            <>
              <RichCard.AttributeDot />
              <RichCard.Attribute>
                <EvaHeartOutlineIcon />
                {formatCount(postData.likeCount)}
              </RichCard.Attribute>
              <RichCard.AttributeDot />
              <RichCard.Attribute>{formatElapsedTime(postData.publishedAt)}</RichCard.Attribute>
            </>
          ),
          feedbackButton: (
            <>
              <RichCard.FeedbackButton ref={anchorRef} onClick={toggle}>
                <EvaMoreVerticalOutlineIcon />
              </RichCard.FeedbackButton>

              <Menux open={isOpen} anchorEl={anchorRef.current} placement="left-start" onClose={close}>
                <MenuItem>
                  <ListItemIcon>
                    <EvaBookmarkOutlineIcon />
                  </ListItemIcon>
                  북마크
                </MenuItem>

                <MenuItem>
                  <ListItemIcon>
                    <FluentShare24RegularIcon />
                  </ListItemIcon>
                  공유하기
                </MenuItem>

                <MenuItem>
                  <ListItemIcon>
                    <MaterialSymbolsBlockIcon />
                  </ListItemIcon>
                  차단하기
                </MenuItem>

                <MenuItem>
                  <ListItemIcon>
                    <MaterialSymbolsReportOutlineIcon />
                  </ListItemIcon>
                  신고하기
                </MenuItem>
              </Menux>
            </>
          ),
          chips: (
            <>
              {Array.from(postData.keywords, (keyword, i) => (
                <RichCard.Chip
                  key={i}
                  label={keyword}
                  variant="soft"
                  size="small"
                  href={`/search?keyword=${keyword}`}
                />
              ))}
            </>
          ),
          accordion: (
            <RichCard.Accordion
              slots={{
                summary: (
                  <RichCard.Accordion.Summary expandIcon={<MingcuteDownLineIcon />}>
                    미리보기
                  </RichCard.Accordion.Summary>
                ),
                details: (
                  <RichCard.Accordion.Details>
                    <Box sx={{ ...maxLine({ line: 4 }) }}>{postData.preview}</Box>
                  </RichCard.Accordion.Details>
                ),
              }}
            />
          ),
        }}
      />
    </>
  );
};

export const PostRichCards = () => {
  return (
    <>
      <PostRichCard />
      <PostRichCard />
      <PostRichCard />
      <PostRichCard />
    </>
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
      channelUrl: "channel-id-123",
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
              image: <RichCard.Thumbnail.Image src={seriesData.thumbnail} />,
              // image: <RichCard.Thumbnail.Image src={null} />,
            }}
            sx={{ aspectRatio: "16/9" }}
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
            href={`/@${seriesData.channel.channelUrl}`}
            slots={{
              avatar: <RichCard.AvatarLink.Avatar src={seriesData.channel.avatar} />,
            }}
          />
        ),
        title: <RichCard.Title>{seriesData.title}</RichCard.Title>,
        nameLink: (
          <RichCard.NameLink href={`/@${seriesData.channel.channelUrl}`}>{seriesData.channel.name}</RichCard.NameLink>
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
              {formatCount(seriesData.likeCount)}
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
