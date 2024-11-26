"use client";

import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  GravityUiCircleCheckFillIcon,
  NineteenCircleIcon,
  OverviewCard,
  OverviewCardCarousel,
} from "@pency/ui/components";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import NextLink from "next/link";
import { stylesColorScheme } from "@pency/ui/util";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";

export function PopularSection() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const searchParams = useSearchParams();

  const genre = useMemo(() => {
    const param = searchParams.get("genre");
    if (param && Object.keys(GENRE_LABEL).includes(param)) {
      return param as Genre;
    }
    return "ALL" as const;
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
    <Stack spacing={1}>
      <OverviewCardCarousel>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4">전체 인기 포스트</Typography>
          <Button
            component={NextLink}
            href={
              genre !== "ALL" ? `/webtoon/post/list?genre=${genre}&sort=POPULAR` : "/webtoon/post/list?sort=POPULAR"
            }
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
