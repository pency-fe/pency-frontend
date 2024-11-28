"use client";

import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { OverviewCardCarousel } from "@pency/ui/components";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import NextLink from "next/link";
import { stylesColorScheme } from "@pency/ui/util";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { WebToonPostOverviewList } from "_core/webtoon/post";

export function PopularSection() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const searchParams = useSearchParams();

  const genreParam = useMemo(() => {
    const param = searchParams.get("genre");
    if (param && Object.keys(GENRE_LABEL).includes(param)) {
      return param as Genre;
    }
    return "ALL" as const;
  }, [searchParams]);

  return (
    <Stack spacing={1}>
      <OverviewCardCarousel>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4">전체 인기 포스트</Typography>
          <Button
            component={NextLink}
            href={
              genreParam !== "ALL"
                ? `/webtoon/post/list?genre=${genreParam}&sort=POPULAR`
                : "/webtoon/post/list?sort=POPULAR"
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

        <WebToonPostOverviewList genre={genreParam} sort={"POPULAR"} page={1} />
      </OverviewCardCarousel>
    </Stack>
  );
}
