"use client";

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useSearchParams } from "next/navigation";
import NextLink from "next/link";
import { stylesColorScheme } from "@pency/ui/util";
import { useMemo } from "react";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { WT_Post_OverviewCarousel } from "_core/webtoon/post";

export function LatestSection() {
  const theme = useTheme();

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
      <WT_Post_OverviewCarousel>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4">최신 포스트</Typography>
          <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
            <Button
              component={NextLink}
              href={genreParam !== "ALL" ? `/webtoon/post/list?genre=${genreParam}` : "/webtoon/post/list"}
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
            <WT_Post_OverviewCarousel.PrevNav />
            <WT_Post_OverviewCarousel.NextNav />
          </Stack>
        </Box>
        <WT_Post_OverviewCarousel.Container genre={genreParam} />
      </WT_Post_OverviewCarousel>
    </Stack>
  );
}
