"use client";

import { useMemo } from "react";
import NextLink from "next/link";
import {
  Stack,
  Box,
  Typography,
  TextField,
  inputBaseClasses,
  MenuItem,
  Grid,
  Pagination,
  useTheme,
  RadioGroup,
} from "@mui/material";
import { RadioButton } from "@pency/ui/components";
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

function PostList() {
  const theme = useTheme();
  type Sort = {
    options: { value: string; label: string }[];
  };
  const sort: Sort = {
    options: [
      { value: "latest", label: "최신순" },
      { value: "popularity", label: "전체 인기순" },
      { value: "popularity", label: "주간 인기순" },
    ],
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h4">웹툰 포스트</Typography>

        <Box ml="auto">
          <TextField
            select
            defaultValue={sort.options[0]?.value}
            size="small"
            sx={{
              fontSize: 13,
              [`& .${inputBaseClasses.root}`]: {
                [theme.breakpoints.up("xs")]: { height: 34 },
              },
              [`& .${inputBaseClasses.input}`]: {
                [theme.breakpoints.up("xs")]: { fontSize: 12 },
                [theme.breakpoints.up("sm")]: { fontSize: 14 },
              },
            }}
          >
            {sort.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
        <Pagination count={10} />
      </Box>
    </Stack>
  );
}
