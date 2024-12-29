"use client";

import NextLink from "next/link";
import { CardCarouselTemplate } from "@pency/ui/components";
import { WtPostOverviewCardCarousel } from "@/features/wt-post";
import { useGenreParam } from "../model/use-genre-param";

export function PopularSection() {
  const genre = useGenreParam();

  return (
    <CardCarouselTemplate
      slots={{
        title: <CardCarouselTemplate.Title>전체 인기 포스트</CardCarouselTemplate.Title>,
        moreButton: (
          <CardCarouselTemplate.MoreButton
            component={NextLink}
            href={
              genre === "ALL" ? "/webtoon/post/list?sort=POPULAR" : `/webtoon/post/list?genre=${genre}&sort=POPULAR`
            }
          />
        ),
        prevNextNav: (
          <>
            <WtPostOverviewCardCarousel.PrevNav />
            <WtPostOverviewCardCarousel.NextNav />
          </>
        ),
        cardCarousel: <WtPostOverviewCardCarousel genre={genre} sort="POPULAR" />,
      }}
    />
  );
}
