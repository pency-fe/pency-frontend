"use client";

import NextLink from "next/link";
import {
  Stack,
  Box,
  Typography,
  RadioGroup,
  Button,
  MenuItem,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  buttonBaseClasses,
} from "@mui/material";
import {
  RichCardCarousel,
  RadioButton,
  RichCard,
  NineteenCircleIcon,
  GravityUiCircleCheckFillIcon,
  EvaHeartOutlineIcon,
  EvaMoreVerticalOutlineIcon,
  Menux,
  EvaBookmarkOutlineIcon,
  FluentShare24RegularIcon,
  MaterialSymbolsBlockIcon,
  MaterialSymbolsReportOutlineIcon,
  useMenuxState,
} from "@pency/ui/components";
import { stylesColorScheme, maxLine } from "@pency/ui/util";
import { formatRelativeTimeFromUTC, objectEntries } from "@pency/util";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";

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

export function WebtoonSection() {
  const theme = useTheme();

  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  const searchParams = useSearchParams();

  const { channelUrl } = useParams();
  const decodedChannelUrl = useMemo(() => {
    return decodeURIComponent(channelUrl as string);
  }, [channelUrl]);

  const content = useMemo(() => objectEntries(CONTENT_VALUE_LABEL), []);
  const contentParam = useMemo(() => {
    const param = searchParams.get("content");
    if (param && Object.keys(CONTENT_VALUE_LABEL).includes(param)) {
      return param as contentValue;
    }

    return "post" as contentValue;
  }, [searchParams]);

  return (
    <Stack spacing={1}>
      <RichCardCarousel>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4">웹툰</Typography>
        </Box>

        {/* 라디오 버튼 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <RadioGroup value={contentParam}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {content.map(([content, label]) => (
                <RadioButton
                  value={content}
                  key={content}
                  LinkComponent={NextLink}
                  href={`/${decodedChannelUrl}/?content=${content}`}
                  sx={{ flexShrink: 0 }}
                >
                  {label}
                </RadioButton>
              ))}
            </Box>
          </RadioGroup>
          <Button
            component={NextLink}
            // [?] ${decodedChannelUrl}/webtoon/post/list[postId]로 취급되서 뷰어 페이지로 이동함
            href={`${decodedChannelUrl}/webtoon/${contentParam}/list?genre=${"ALL"}?sort=${"latest"}?page=${0}`}
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
          <Box sx={{ display: "flex", alignItems: "center", ml: "auto", gap: 1 }}>
            <RichCardCarousel.PrevNav
              sx={{
                [`& .${buttonBaseClasses.root}`]: {
                  [theme.breakpoints.up("xs")]: {
                    width: 30,
                    height: 30,
                  },
                  [theme.breakpoints.up("md")]: {
                    width: 36,
                    height: 36,
                  },
                },
              }}
            />
            <RichCardCarousel.NextNav
              sx={{
                [`& .${buttonBaseClasses.root}`]: {
                  [theme.breakpoints.up("xs")]: {
                    width: 30,
                    height: 30,
                  },
                  [theme.breakpoints.up("md")]: {
                    width: 36,
                    height: 36,
                  },
                },
              }}
            />
          </Box>
        </Box>

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

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
