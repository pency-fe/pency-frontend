"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import NextLink from "next/link";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { WT_Post_OverviewCarousel } from "_core/webtoon/post";
import { OverviewCardCtemplate } from "@pency/ui/components";

export function PopularSection() {
  const genreParam = useSearchParams().get("genre");

  const genre = useMemo(() => {
    if (genreParam && Object.keys(GENRE_LABEL).includes(genreParam)) {
      return genreParam as Genre;
    }
    return "ALL" as const;
  }, [genreParam]);

  return (
    <OverviewCardCtemplate
      OverviewCarousel={WT_Post_OverviewCarousel}
      slots={{
        title: <OverviewCardCtemplate.Title>전체 인기 포스트</OverviewCardCtemplate.Title>,
        moreButton: (
          <OverviewCardCtemplate.MoreButton
            component={NextLink}
            href={
              genre === "ALL" ? "/webtoon/post/list?sort=POPULAR" : `/webtoon/post/list?genre=${genre}&sort=POPULAR`
            }
          />
        ),
        prevNextNav: (
          <>
            <WT_Post_OverviewCarousel.PrevNav />
            <WT_Post_OverviewCarousel.NextNav />
          </>
        ),
        overviewCarouselContainer: <WT_Post_OverviewCarousel.Container genre={genre} sort="POPULAR" />,
      }}
    />
  );
}
