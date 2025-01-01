"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import NextLink from "next/link";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { WT_Post_OverviewCarousel } from "_core/webtoon/post";
import { CardCarouselTemplate } from "@pency/ui/components";

export function WeekPopularSection() {
  const genreParam = useSearchParams().get("genre");

  const genre = useMemo(() => {
    if (genreParam && Object.keys(GENRE_LABEL).includes(genreParam)) {
      return genreParam as Genre;
    }
    return "ALL" as const;
  }, [genreParam]);

  return (
    <CardCarouselTemplate
      CardCarousel={WT_Post_OverviewCarousel}
      slots={{
        title: <CardCarouselTemplate.Title>주간 인기 포스트</CardCarouselTemplate.Title>,
        moreButton: (
          <CardCarouselTemplate.MoreButton
            component={NextLink}
            href={
              genre === "ALL" ? "/webtoon/post/list?sort=WPOPULAR" : `/webtoon/post/list?genre=${genre}&sort=WPOPULAR`
            }
          />
        ),
        prevNextNav: (
          <>
            <WT_Post_OverviewCarousel.PrevNav />
            <WT_Post_OverviewCarousel.NextNav />
          </>
        ),
        container: <WT_Post_OverviewCarousel.Container genre={genre} sort="WPOPULAR" />,
      }}
    />
  );
}
