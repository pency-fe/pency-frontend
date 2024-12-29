"use client";

import NextLink from "next/link";
import { CardCarouselTemplate } from "@pency/ui/components";
import { useGenreParam } from "../model/use-genre-param";
import { WtPostOverviewCarousel } from "@/features/wt-post";

export function WeekPopularSection() {
  const genre = useGenreParam();

  return (
    <CardCarouselTemplate
      CardCarousel={WtPostOverviewCarousel}
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
            <WtPostOverviewCarousel.PrevNav />
            <WtPostOverviewCarousel.NextNav />
          </>
        ),
        container: <WtPostOverviewCarousel.Container genre={genre} sort="WPOPULAR" />,
      }}
    />
  );
}
