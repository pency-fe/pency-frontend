"use client";

import NextLink from "next/link";
import {
  useTheme,
  Stack,
  RadioGroup,
  Box,
  Typography,
  Button,
  buttonBaseClasses,
  MenuItem,
  Pagination,
} from "@mui/material";
import {
  useMenuxState,
  RadioButton,
  EvaArrowIosUpwardFillIcon,
  EvaArrowIosDownwardFillIcon,
  Menux,
} from "@pency/ui/components";
import { objectEntries, createQueryString } from "@pency/util";
import { WT_Post_RichList } from "_core/webtoon/post";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";

// ----------------------------------------------------------------------

type contentValue = "post" | "series";

const CONTENT_VALUE_LABEL: Record<contentValue, string> = {
  post: "포스트",
  series: "시리즈",
} as const;

type Sort = "LATEST" | "POPULAR" | "WPOPULAR";

const SORT_LABEL: Record<Sort, string> = {
  LATEST: "최신순",
  POPULAR: "전체 인기순",
  WPOPULAR: "주간 인기순",
};

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

export function WebtoonPage() {
  const searchParams = useSearchParams();
  const theme = useTheme();
  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  const { channelUrl } = useParams();
  const decodedChannelUrl = useMemo(() => {
    return decodeURIComponent(channelUrl as string);
  }, [channelUrl]);

  const contents = useMemo(() => objectEntries(CONTENT_VALUE_LABEL), []);
  const sorts = useMemo(() => objectEntries(SORT_LABEL), []);

  const sortParam = useMemo(() => {
    const param = searchParams.get("sort");
    if (param && Object.keys(SORT_LABEL).includes(param)) {
      return param as Sort;
    }
    return "LATEST" as Sort;
  }, [searchParams]);

  const contentParam = useMemo(() => {
    const param = searchParams.get("webtoon");
    if (param && Object.keys(CONTENT_VALUE_LABEL).includes(param)) {
      return param as contentValue;
    }

    return "post" as contentValue;
  }, [searchParams]);

  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* 라디오 버튼 */}
        <RadioGroup value={contentParam}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {contents.map(([content, label]) => (
              <RadioButton
                value={content}
                key={content}
                LinkComponent={NextLink}
                href={`/${decodedChannelUrl}/webtoon/?webtoon=${content}`}
                sx={{ flexShrink: 0 }}
              >
                {label}
              </RadioButton>
            ))}
          </Box>
        </RadioGroup>

        <Box ml="auto">
          <Button
            ref={anchorRef}
            variant="outlined"
            onClick={toggle}
            endIcon={isOpen ? <EvaArrowIosUpwardFillIcon /> : <EvaArrowIosDownwardFillIcon />}
            sx={{
              [`&.${buttonBaseClasses.root}`]: { color: theme.vars.palette.text.secondary },
            }}
          >
            {SORT_LABEL[sortParam]}
          </Button>
          <Menux
            open={isOpen}
            anchorEl={anchorRef.current}
            placement="bottom-end"
            onClose={close}
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 6],
                },
              },
            ]}
            sx={{ width: "150px" }}
          >
            {sorts.map(([sort, label]) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("sort", sort);
              return (
                <MenuItem
                  key={sort}
                  component={NextLink}
                  href={`/webtoon/post/list${createQueryString(params)}`}
                  selected={sortParam === sort}
                  onClick={close}
                >
                  {label}
                </MenuItem>
              );
            })}
          </Menux>
        </Box>
      </Box>
      <WT_Post_RichList genre={"ALL"} sort={sortParam} page={1} />
      <Box sx={{ margin: "auto", mt: 3 }}>
        <Pagination count={10} />
      </Box>
    </Stack>
  );
}
