"use client";

import { BannerSection } from "./sections";
import { Box, Button, RadioGroup, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  EvaHeartOutlineIcon,
  GravityUiCircleCheckFillIcon,
  ListItemx,
  ListItemxCarousel,
  NineteenCircleIcon,
  OverviewCard,
  OverviewCardCarousel,
  RadioButton,
} from "@pency/ui/components";
import { useMemo, useState } from "react";
import { GENRE_LABEL } from "_core/webtoon/const";
import { objectEntries } from "@pency/util";
import { hideScrollX } from "@pency/ui/util";
import { useRouter, useSearchParams } from "next/navigation";
import NextLink from "next/link";
import { stylesColorScheme } from "@pency/ui/util";

export default function PostPage() {
  return (
    <Stack spacing={5}>
      <Stack spacing={1.5}>
        <RadioTabButton />
        <BannerSection />
      </Stack>
      <Rank />
      <LatestPost />
      <AllPopularityPost />
      <WeeklyPopularityPost />
    </Stack>
  );
}

function RadioTabButton() {
  const router = useRouter();
  const [state, setState] = useState("ALL");
  const genres = useMemo(() => objectEntries(GENRE_LABEL), []);

  return (
    <RadioGroup
      value={state}
      onChange={(e) => {
        setState(e.target.value);
        router.push(`/webtoon/post?genre=${e.target.value.toLowerCase()}`);
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 1, width: 1, overflowX: "scroll", ...hideScrollX }}>
        <RadioButton value="ALL">전체</RadioButton>
        {genres.map(([genre, label]) => (
          <RadioButton value={genre}> {label}</RadioButton>
        ))}
      </Box>
    </RadioGroup>
  );
}

function Rank() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const postData = {
    postId: "post-id-123",
    thumbnail:
      "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
    age: "NINETEEN",
    title: "천재 궁수의 스트리밍",
    channel: {
      name: "김천재의 채널",
    },
    likeCount: 100,
  };

  return (
    <Stack spacing={1}>
      <ListItemxCarousel>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography variant="h4">포스트 랭킹</Typography>
          <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
            <ListItemxCarousel.PrevNav size={isUpMd ? "medium" : "small"} />
            <ListItemxCarousel.NextNav size={isUpMd ? "medium" : "small"} />
          </Box>
        </Box>

        <ListItemxCarousel.Container
          slots={{
            slides: (
              <>
                {Array.from({ length: 6 }, () => (
                  <ListItemxCarousel.Slide>
                    {Array.from({ length: 3 }, () => (
                      <ListItemx
                        slots={{
                          overlayElement: <ListItemx.OverlayAnchor href={`/webtoon/post/${postData.postId}`} />,
                          thumbnail: (
                            <ListItemx.Thumbnail
                              sx={{ aspectRatio: "16/9" }}
                              slots={{
                                image: <ListItemx.Thumbnail.Image src={postData.thumbnail} />,
                                topEnd: postData.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
                              }}
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
                    ))}
                  </ListItemxCarousel.Slide>
                ))}
              </>
            ),
          }}
        />
      </ListItemxCarousel>
    </Stack>
  );
}

function LatestPost() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const searchParams = useSearchParams();
  const genre = useMemo(() => {
    if (searchParams.get("genre")) {
      return searchParams.get("genre")?.toLowerCase();
    } else {
      return "all";
    }
  }, [searchParams]);

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
    <Stack spacing={2}>
      <Box sx={{}}></Box>
      <OverviewCardCarousel>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4">최신 포스트</Typography>
          <Button
            component={NextLink}
            href={`/webtoon/post/${genre}`}
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
    </Stack>
  );
}

function AllPopularityPost() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const searchParams = useSearchParams();
  const genre = useMemo(() => {
    if (searchParams.get("genre")) {
      return searchParams.get("genre")?.toLowerCase();
    } else {
      return "all";
    }
  }, [searchParams]);

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
    <Stack spacing={2}>
      <Box sx={{}}></Box>
      <OverviewCardCarousel>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4">전체 인기 포스트</Typography>
          <Button
            component={NextLink}
            href={`/webtoon/post/${genre}`}
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
    </Stack>
  );
}

function WeeklyPopularityPost() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const searchParams = useSearchParams();
  const genre = useMemo(() => {
    if (searchParams.get("genre")) {
      return searchParams.get("genre")?.toLowerCase();
    } else {
      return "all";
    }
  }, [searchParams]);
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
    <Stack spacing={2}>
      <Box sx={{}}></Box>
      <OverviewCardCarousel>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4">주간 인기 포스트</Typography>
          <Button
            component={NextLink}
            href={`/webtoon/post/${genre}`}
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
    </Stack>
  );
}
