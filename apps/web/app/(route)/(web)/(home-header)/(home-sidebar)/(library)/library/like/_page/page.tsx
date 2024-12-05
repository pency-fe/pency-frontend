"use client";

import NextLink from "next/link";
import { Box, IconButton, PaginationItem, RadioGroup, Stack, useTheme } from "@mui/material";
import {
  EvaHeartFillIcon,
  EvaHeartOutlineIcon,
  ListItemx,
  listItemxClasses,
  NineteenCircleIcon,
  RadioButton,
} from "@pency/ui/components";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { createQueryString, objectEntries } from "@pency/util";
import { usePaginationx } from "@pency/ui/hooks";

// ----------------------------------------------------------------------

type contentValue = "WEBTOON" | "WEBNOBEL";

const CONTENT_VALUE_LABEL: Record<contentValue, string> = {
  WEBTOON: "웹툰",
  WEBNOBEL: "웹소설",
} as const;

// ----------------------------------------------------------------------

export default function LibraryLikePage() {
  const searchParams = useSearchParams();

  const contents = useMemo(() => objectEntries(CONTENT_VALUE_LABEL), []);

  const contentParam = useMemo(() => {
    const param = searchParams.get("content");
    if (param && Object.keys(CONTENT_VALUE_LABEL).includes(param)) {
      return param as contentValue;
    }

    return "ALL" as contentValue;
  }, [searchParams]);

  return (
    <Stack spacing={1}>
      <RadioGroup value={contentParam}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          <RadioButton
            value="ALL"
            LinkComponent={NextLink}
            href={(() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete("content");
              return `/library/like`;
            })()}
            sx={{ flexShrink: 0 }}
          >
            전체
          </RadioButton>
          {contents.map(([content, label]) => (
            <RadioButton
              value={content}
              key={content}
              LinkComponent={NextLink}
              href={(() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("content", content);
                params.delete("page");
                return `/library/like${createQueryString(params)}`;
              })()}
              sx={{ flexShrink: 0 }}
            >
              {label}
            </RadioButton>
          ))}
        </Box>
      </RadioGroup>

      <Stack spacing={0.5}>
        {/* {contentParam !== "WEBNOBEL" && contentParam !== "WEBTOON" ? <WebPostRichCard /> : null} */}
        {contentParam === "WEBTOON" ? <WebtoonListItemx /> : null}
        {/* {contentParam === "WEBNOBEL" ? <WebnobelPostRichCard /> : null} */}
      </Stack>

      <Box sx={{ margin: "auto", mt: 3 }}>
        <Pagination />
      </Box>
    </Stack>
  );
}

// ----------------------------------------------------------------------
const postData = {
  postId: "post-id-123",
  thumbnail:
    "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
  age: "NINETEEN",

  title: "4화 천재 궁수의 스트리밍",
  channel: {
    channelUrl: "dddddd",
    name: "김천재의 채널",
  },
  series: "천재 궁수의 스트리밍", // 값이 없으면 null
  liked: true,
};

function WebtoonListItemx() {
  const theme = useTheme();

  return (
    <>
      {Array.from({ length: 18 }, (_, i) => (
        <ListItemx
          key={i}
          slots={{
            overlayElement: (
              <ListItemx.OverlayAnchor href={`/@${postData.channel.channelUrl}/webtoon/post/${postData.postId}`} />
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
                {postData.series ? (
                  <>
                    <ListItemx.Attribute.Dot />
                    {postData.series}
                  </>
                ) : null}
              </ListItemx.Attribute>
            ),
            trailing: (
              <ListItemx.Trailing>
                <IconButton>{postData.liked ? <EvaHeartFillIcon /> : <EvaHeartOutlineIcon />}</IconButton>
              </ListItemx.Trailing>
            ),
          }}
          sx={{
            flexShrink: 0,
            [`&.${listItemxClasses.root}`]: {
              [theme.breakpoints.up("sm")]: {
                height: "80px",
              },
            },
          }}
        />
      ))}
    </>
  );
}

// ----------------------------------------------------------------------

function Pagination() {
  const searchParams = useSearchParams();
  const pageParam = useMemo(() => {
    const param = Number(searchParams.get("page"));
    if (param && !isNaN(param) && param >= 1) {
      return param;
    }
    return 1;
  }, [searchParams]);

  const paginations = usePaginationx({ pageCount: 20, currentPage: pageParam });

  return (
    <>
      {paginations.map((pagination) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", `${pagination.page}`);
        return (
          <PaginationItem component={NextLink} href={`/library/like${createQueryString(params)}`} {...pagination} />
        );
      })}
    </>
  );
}
