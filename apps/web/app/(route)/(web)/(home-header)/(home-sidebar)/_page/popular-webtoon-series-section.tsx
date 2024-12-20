"use client";

import NextLink from "next/link";
import { OverviewCardCtemplate } from "@pency/ui/components";
import { WT_Post_OverviewCarousel } from "_core/webtoon/post";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";

// [TODO] 시리즈 완성 시 변경하기
export function PopularWebtoonSeriesSection() {
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
          title: <OverviewCardCtemplate.Title>인기 웹툰 시리즈</OverviewCardCtemplate.Title>,
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
          overviewCarouselContainer: <WT_Post_OverviewCarousel.Container genre={genreParam} sort="POPULAR" />,
        }}
      />
    </WT_Post_OverviewCarousel>
  );
}
