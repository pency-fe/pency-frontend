"use client";

import { useSearchParams } from "next/navigation";
import NextLink from "next/link";
import { useMemo } from "react";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { WT_Post_OverviewCarousel } from "_core/webtoon/post";
import { OverviewCardCtemplate } from "@pency/ui/components";

export function LatestSection() {
  const genreParam = useSearchParams().get("genre");

  const genre = useMemo(() => {
    if (genreParam && Object.keys(GENRE_LABEL).includes(genreParam)) {
      return genreParam as Genre;
    }
    return "ALL" as const;
  }, [genreParam]);

  return (
    <WT_Post_OverviewCarousel>
      <OverviewCardCtemplate
        slots={{
          title: <OverviewCardCtemplate.Title>최신 포스트</OverviewCardCtemplate.Title>,
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
          overviewCarouselContainer: <WT_Post_OverviewCarousel.Container genre={genre} />,
        }}
      />
    </WT_Post_OverviewCarousel>
  );
}
