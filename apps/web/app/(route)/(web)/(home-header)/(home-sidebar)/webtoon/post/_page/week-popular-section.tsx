"use client";

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import NextLink from "next/link";
import { stylesColorScheme } from "@pency/ui/util";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { WT_Post_OverviewCarousel } from "_core/webtoon/post";
import { OverviewCardCtemplate } from "@pency/ui/components";

export function WeekPopularSection() {
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
    <WT_Post_OverviewCarousel>
      <OverviewCardCtemplate
        slots={{
          title: <OverviewCardCtemplate.Title>주간 인기 포스트</OverviewCardCtemplate.Title>,
          moreButton: (
            <OverviewCardCtemplate.MoreButton
              component={NextLink}
              href={genreParam !== "ALL" ? `/webtoon/post/list?genre=${genreParam}` : "/webtoon/post/list"}
            />
          ),
          prevNextNav: (
            <>
              <WT_Post_OverviewCarousel.PrevNav />
              <WT_Post_OverviewCarousel.NextNav />
            </>
          ),
          overviewCarouselContainer: <WT_Post_OverviewCarousel.Container genre={genreParam} sort="WPOPULAR" />,
        }}
      />
    </WT_Post_OverviewCarousel>
  );
}
