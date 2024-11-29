"use client";

import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  RadioGroup,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import NextLink from "next/link";
import { maxLine, stylesColorScheme } from "@pency/ui/util";
import { useMemo } from "react";
import {
  EvaBookmarkOutlineIcon,
  EvaHeartOutlineIcon,
  EvaMoreVerticalOutlineIcon,
  FluentShare24RegularIcon,
  GravityUiCircleCheckFillIcon,
  MaterialSymbolsBlockIcon,
  MaterialSymbolsReportOutlineIcon,
  Menux,
  MingcuteDownLineIcon,
  NineteenCircleIcon,
  RadioButton,
  RichCard,
  RichCardCarousel,
  useMenuxState,
} from "@pency/ui/components";
import { formatRelativeTimeFromUTC, objectEntries } from "@pency/util";

// ----------------------------------------------------------------------

type contentValue = "post" | "series";

const CONTENT_VALUE_LABEL: Record<contentValue, string> = {
  post: "포스트",
  series: "시리즈",
} as const;

// ----------------------------------------------------------------------

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
  createdAt: 1730535831,
  keywords: ["BL", "**공", "**수", "판타지", "학원물", "고수위", "후방주의", "유혈"],
  preview:
    "선수권 대회 최연소 우승, 양궁 유망주.\n\n승승장구 하는 줄 알았으나 비운의 사고로 \n다시는 활을 쥘 수 없게 된 몰락한 천재 양궁 선수 유상현!\n\n낙하산으로 들어간 회사에서마저 잘린 그는,\n먹고살기 위해 게임 스트리머, 아몬드가 되는데...\n\n[활을 선택하셨습니다.]\n\n피융! 푸욱!\n\n[헤드샷!]\n\n“보스 원래 한 방이에요?”\n\n미친 재능이 다시금 빛을 발한다!\n\n28살. 고졸. 백수.\n특기는 양궁.\n\n방송 천재가 되어 돌아온, 그의 유쾌한 반란이 시작된다?!\n\n[천재 궁수의 스트리밍]",
};

// ----------------------------------------------------------------------

export default function ChannelUrlPage() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const { channelUrl } = useParams();
  const decodedChannelUrl = useMemo(() => {
    return decodeURIComponent(channelUrl as string);
  }, [channelUrl]);
  const searchParams = useSearchParams();

  const webtoon = useMemo(() => objectEntries(CONTENT_VALUE_LABEL), []);

  const webtoonParam = useMemo(() => {
    const param = searchParams.get("webtoon");
    if (param && Object.keys(CONTENT_VALUE_LABEL).includes(param)) {
      return param as contentValue;
    }

    return "post" as contentValue;
  }, [searchParams]);

  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  return (
    <Stack spacing={1}>
      <RichCardCarousel>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4">웹툰</Typography>
          <Button
            component={NextLink}
            href={`${decodedChannelUrl}/webtoon/post/list?genre=${"ALL"}?sort=${"latest"}?page=${0}`}
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
            <RichCardCarousel.PrevNav size={isUpMd ? "medium" : "small"} />
            <RichCardCarousel.NextNav size={isUpMd ? "medium" : "small"} />
          </Stack>
        </Box>

        {/* 라디오 버튼 */}
        <RadioGroup value={webtoonParam}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {webtoon.map(([content, label]) => (
              <RadioButton
                value={content}
                key={content}
                LinkComponent={NextLink}
                href={`/${decodedChannelUrl}/?webtoon=${content}`}
                sx={{ flexShrink: 0 }}
              >
                {label}
              </RadioButton>
            ))}
          </Box>
        </RadioGroup>

        <RichCardCarousel.Container
          slots={{
            slides: (
              <>
                {Array.from({ length: 10 }, (_, i) => {
                  return (
                    <RichCardCarousel.Slide key={i}>
                      <RichCard
                        slots={{
                          overlayElement: <RichCard.OverlayAnchor href={`/webtoon/post/${postData.postId}`} />,
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
                              href={`/channel/${postData.channel.channelId}`}
                              slots={{
                                avatar: <RichCard.AvatarLink.Avatar src={postData.channel.avatar} />,
                              }}
                            />
                          ),
                          title: <RichCard.Title>{postData.title}</RichCard.Title>,
                          nameLink: (
                            <RichCard.NameLink href={`/channel/${postData.channel.channelId}`}>
                              {postData.channel.name}
                            </RichCard.NameLink>
                          ),
                          attributes: (
                            <>
                              <RichCard.AttributeDot />
                              <RichCard.Attribute>
                                <EvaHeartOutlineIcon />
                                {postData.likeCount}
                              </RichCard.Attribute>
                              <RichCard.AttributeDot />
                              <RichCard.Attribute>{formatRelativeTimeFromUTC(postData.createdAt)}</RichCard.Attribute>
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
                    </RichCardCarousel.Slide>
                  );
                })}
              </>
            ),
          }}
        />
      </RichCardCarousel>
    </Stack>
  );
}
