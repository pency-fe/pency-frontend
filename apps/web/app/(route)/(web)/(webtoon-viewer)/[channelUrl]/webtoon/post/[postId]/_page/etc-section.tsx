"use client";

import NextLink from "next/link";
import {
  Box,
  Avatar,
  Typography,
  Button,
  AvatarGroup,
  avatarClasses,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
  Link,
} from "@mui/material";
import {
  EvaHeartOutlineIcon,
  ListItemx,
  NineteenCircleIcon,
  OverviewCardCarousel,
  OverviewCard,
  GravityUiCircleCheckFillIcon,
} from "@pency/ui/components";
import { stylesColorScheme } from "@pency/ui/util";
import { WT_Post_List_Comment } from "_core/webtoon/post";

// ----------------------------------------------------------------------

export function EtcSection() {
  return (
    <Stack spacing={1}>
      <ChannelAction />
      <PostLikeSummary />
      <PostPrevNext />
      <OtherPostOfAuthor />
    </Stack>
  );
}

// ----------------------------------------------------------------------

function ChannelAction() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        bgcolor: theme.vars.palette.background.paper,
        borderRadius: 1.5,
        paddingX: 2.5,
        paddingY: 1.5,
      }}
    >
      <Avatar
        component={NextLink}
        href="TODO_채널_이동"
        alt=""
        src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png"
      />
      <Box sx={{ mr: "auto" }}>
        <Link
          component={NextLink}
          href="TODO_채널_이동"
          variant="subtitle1"
          underline="none"
          sx={{ color: theme.vars.palette.text.primary }}
        >
          김천재
        </Link>
        <Typography variant="body2" sx={{ color: theme.vars.palette.text.secondary }}>
          구독자 2천명
        </Typography>
      </Box>
      <Button variant="contained">구독하기</Button>
    </Box>
  );
}

// ----------------------------------------------------------------------

function PostLikeSummary() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        bgcolor: theme.vars.palette.background.paper,
        borderRadius: 1.5,
        paddingX: 2.5,
        paddingY: 1.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
          <AvatarGroup max={4} sx={{ [`& .${avatarClasses.root}`]: { width: 24, height: 24 } }}>
            <Avatar alt="" src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png" />
            <Avatar alt="" src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png" />
            <Avatar alt="" src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png" />
          </AvatarGroup>
          <Box>
            <Typography variant="body2" color={theme.vars.palette.text.secondary}>
              구매자 50명 중
            </Typography>
            <Typography variant="subtitle1">구매자 42명이 좋아합니다.</Typography>
          </Box>
        </Box>
        <IconButton variant="soft" sx={{ ml: "auto" }}>
          <EvaHeartOutlineIcon />
        </IconButton>
      </Box>
      <WT_Post_List_Comment
        data={{
          commentId: "123",
          channel: {
            channelId: "13",
            avatar: "https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png",
            name: "김천재",
          },
          label: "구매자",
          createdAt: 1730535831,
          comment:
            "넘 재밌어요! 넘 재밌어요! 넘 재밌어요! 넘 재밌어요! 넘 재밌어요! 넘 재밌어요! 넘 재밌어요! 넘 재밌어요! 넘 재밌어요! 넘 재밌어요! 넘 재밌어요! 넘 재밌어요! 넘 재밌어요! 넘 재밌어요! 넘 재밌어요! 넘 재밌어요! 넘 재밌어요! 넘 재밌어요! ",
          likeCount: 1,
          replyCount: 2,
        }}
      ></WT_Post_List_Comment>
    </Box>
  );
}

// ----------------------------------------------------------------------

function PostPrevNext() {
  const theme = useTheme();

  const postData = {
    postId: "post-id-123",
    thumbnail:
      "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
    age: "NINETEEN",
    // title: "천재 궁수의 스트리밍1 천재 궁수의 스트리밍2 천재 궁수의 스트리밍3 천재 궁수의 스트리밍4",
    title: "천재 궁수의 스트리밍",
    channel: {
      name: "김천재의 채널",
    },
    likeCount: 100,
  };

  return (
    <Stack
      spacing={1}
      sx={{
        bgcolor: theme.vars.palette.background.paper,
        borderRadius: 1.5,
        paddingX: 2.5,
        paddingY: 1.5,
      }}
    >
      <ListItemx
        slots={{
          overlayElement: <ListItemx.OverlayAnchor href={`/webtoon/post/${postData.postId}`} />,
          leadingLabel: (
            <ListItemx.LeadingLabel variant="button" color={theme.vars.palette.text.secondary} sx={{ flexShrink: 0 }}>
              이전화
            </ListItemx.LeadingLabel>
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
      <ListItemx
        slots={{
          overlayElement: <ListItemx.OverlayAnchor href={`/webtoon/post/${postData.postId}`} />,
          leadingLabel: (
            <ListItemx.LeadingLabel variant="button" color={theme.vars.palette.text.secondary} sx={{ flexShrink: 0 }}>
              다음화
            </ListItemx.LeadingLabel>
          ),
          thumbnail: (
            <ListItemx.Thumbnail
              slots={{
                image: <ListItemx.Thumbnail.Image src={postData.thumbnail} />,
                topEnd: postData.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
              }}
              sx={{ aspectRatio: "16/9" }}
            />
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
    </Stack>
  );
}

function OtherPostOfAuthor() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

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
    <Box
      sx={{
        bgcolor: theme.vars.palette.background.paper,
        borderRadius: 1.5,
        paddingX: 2.5,
        paddingY: 1.5,
      }}
    >
      <OverviewCardCarousel>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Typography variant="h4">전체 인기 포스트</Typography>
          <Button
            component={NextLink}
            href={"TODO_작가_웹툰_채널"}
            size="small"
            color="inherit"
            sx={{
              color: theme.vars.palette.grey[500],
              [stylesColorScheme.dark]: {
                color: theme.vars.palette.grey[500],
              },
            }}
          >
            더 보기
          </Button>
          <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
            <OverviewCardCarousel.PrevNav size={isUpMd ? "medium" : "small"} />
            <OverviewCardCarousel.NextNav size={isUpMd ? "medium" : "small"} />
          </Stack>
        </Box>

        <OverviewCardCarousel.Container
          slots={{
            slides: (
              <>
                {Array.from({ length: 10 }, (_, i) => (
                  <OverviewCardCarousel.Slide key={i}>
                    <OverviewCard
                      slots={{
                        overlayElement: <OverviewCard.OverlayAnchor href={`/webtoon/post/${postData.postId}`} />,
                        thumbnail: (
                          <OverviewCard.Thumbnail
                            slots={{
                              image: <OverviewCard.Thumbnail.Image src={postData.thumbnail} />,
                              // image: <OverviewCard.Thumbnail.Image src={null} />,

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
                                color="success"
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
                  </OverviewCardCarousel.Slide>
                ))}
              </>
            ),
          }}
        />
      </OverviewCardCarousel>
    </Box>
  );
}
