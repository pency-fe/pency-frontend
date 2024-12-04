"use client";

import NextLink from "next/link";
import { Box, Grid, PaginationItem, RadioGroup, Stack } from "@mui/material";
import { RadioButton } from "@pency/ui/components";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { createQueryString, objectEntries } from "@pency/util";
import { WT_Post_RichCard } from "_core/webtoon/post";
import { usePaginationx } from "@pency/ui/hooks";

// ----------------------------------------------------------------------

type contentValue = "WEBTOON" | "WEBNOBEL";

const CONTENT_VALUE_LABEL: Record<contentValue, string> = {
  WEBTOON: "웹툰",
  WEBNOBEL: "웹소설",
} as const;

// ----------------------------------------------------------------------

export default function LibraryBookmarkPage() {
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
    <Stack spacing={3}>
      <RadioGroup value={contentParam}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          <RadioButton
            value="ALL"
            LinkComponent={NextLink}
            href={(() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete("content");
              return `/library/bookmark`;
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
                return `/library/bookmark${createQueryString(params)}`;
              })()}
              sx={{ flexShrink: 0 }}
            >
              {label}
            </RadioButton>
          ))}
        </Box>
      </RadioGroup>

      {/* {contentParam !== "WEBNOBEL" && contentParam !== "WEBTOON" ? <WebPostRichCard /> : null} */}
      {contentParam === "WEBTOON" ? <WebtoonPostRichCard /> : null}
      {/* {contentParam === "WEBNOBEL" ? <WebnobelPostRichCard /> : null} */}

      <Box sx={{ margin: "auto", mt: 3 }}>
        <Pagination />
      </Box>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function WebtoonPostRichCard() {
  return (
    <>
      <Grid container spacing={1}>
        {Array.from({ length: 18 }, (_, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <WT_Post_RichCard
              data={{
                postId: "1",
                thumbnail:
                  "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
                age: "ALL",
                price: 0,
                purchased: false,
                creationType: "PRIMARY",
                pair: "NONE",
                genre: "ROMANCE",
                title: "천재 궁수의 스트리밍",
                channel: {
                  channelUrl: "dddddd",
                  image: "https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png",
                  title: "김천재",
                },
                likeCount: 0,
                createdAt: 0,
                keywords: ["BJ", "스트리머"],
              }}
            />
          </Grid>
        ))}
      </Grid>
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
          <PaginationItem component={NextLink} href={`/library/bookmark${createQueryString(params)}`} {...pagination} />
        );
      })}
    </>
  );
}
