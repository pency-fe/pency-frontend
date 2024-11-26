"use client";

import { useMemo } from "react";
import NextLink from "next/link";
import { Stack, Box, Typography, MenuItem, Grid, Pagination, RadioGroup, Button, PaginationItem } from "@mui/material";
import {
  EvaArrowIosDownwardFillIcon,
  EvaArrowIosUpwardFillIcon,
  Menux,
  RadioButton,
  useMenuxState,
} from "@pency/ui/components";
import { hideScrollX } from "@pency/ui/util";
import { createQueryString, objectEntries } from "@pency/util";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { WT_Post_RichCard } from "_core/webtoon/post";
import { useSearchParams } from "next/navigation";

export function ListPage() {
  return (
    <Stack spacing={3}>
      <RadioTabButton />
      <PostList />
    </Stack>
  );
}

function RadioTabButton() {
  const searchParams = useSearchParams();

  const genres = useMemo(() => objectEntries(GENRE_LABEL), []);

  const genreParam = useMemo(() => {
    const param = searchParams.get("genre");
    if (param && Object.keys(GENRE_LABEL).includes(param)) {
      return param as Genre;
    }
    return "ALL" as const;
  }, [searchParams]);

  return (
    <RadioGroup
      value={genreParam}
      sx={{ flexDirection: "row", flexWrap: "nowrap", gap: 1, overflowX: "scroll", ...hideScrollX }}
    >
      <RadioButton
        LinkComponent={NextLink}
        value="ALL"
        href={(() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("genre");
          params.delete("page");
          return `/webtoon/post/list${createQueryString(params)}`;
        })()}
        sx={{ flexShrink: 0 }}
      >
        전체
      </RadioButton>
      {genres.map(([genre, label]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("genre", genre);
        params.delete("page");
        return (
          <RadioButton
            LinkComponent={NextLink}
            value={genre}
            href={`/webtoon/post/list${createQueryString(params)}`}
            sx={{ flexShrink: 0 }}
          >
            {label}
          </RadioButton>
        );
      })}
    </RadioGroup>
  );
}

type Sort = "LATEST" | "POPULAR" | "WPOPULAR";

const SORT_LABEL: Record<Sort, string> = {
  LATEST: "최신순",
  POPULAR: "전체 인기순",
  WPOPULAR: "주간 인기순",
};

function PostList() {
  const searchParams = useSearchParams();
  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  const sortParam = useMemo(() => {
    const param = searchParams.get("sort");
    if (param && Object.keys(SORT_LABEL).includes(param)) {
      return param as Sort;
    }
    return "LATEST" as Sort;
  }, [searchParams]);

  const sorts = useMemo(() => objectEntries(SORT_LABEL), []);

  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h4">웹툰 포스트</Typography>

        <Box ml="auto">
          <Button
            ref={anchorRef}
            variant="outlined"
            onClick={toggle}
            endIcon={isOpen ? <EvaArrowIosUpwardFillIcon /> : <EvaArrowIosDownwardFillIcon />}
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
      <Grid container spacing={1}>
        {Array.from({ length: 12 }, (_, index) => (
          <Grid item key={index} xs={15} sm={6} md={4} lg={3}>
            <WT_Post_RichCard
              data={{
                postId: "1",
                thumbnail:
                  "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
                age: "ALL",
                price: 100,
                purchased: false,
                creationType: "PRIMARY",
                pair: "NONE",
                genre: "ROMANCE",
                title: "천재 궁수의 스트리밍",
                channel: {
                  channelId: "123",
                  avatar: "https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png",
                  name: "김천재",
                },
                likeCount: 0,
                createdAt: 0,
                keywords: ["환생", "판타지", "BJ", "미남", "너드"],
                preview:
                  "천재 궁수의 스트리밍 천재 궁수의 스트리밍 천재 궁수의 스트리밍 천재 궁수의 스트리밍 천재 궁수의 스트리밍 천재 궁수의 스트리밍 천재 궁수의 스트리밍 천재 궁수의 스트리밍 천재 궁수의 스트리밍 천재 궁수의 스트리밍 천재 궁수의 스트리밍 천재 궁수의 스트리밍 ",
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ margin: "auto", mt: 3 }}>
        <Pagination
          count={30}
          boundaryCount={0}
          siblingCount={2}
          renderItem={(item) => {
            console.log(item);
            if (item.type === "start-ellipsis" || item.type === "end-ellipsis") {
              return;
            }
            return <PaginationItem {...item} />;
          }}
        />
      </Box>
    </Stack>
  );
}
