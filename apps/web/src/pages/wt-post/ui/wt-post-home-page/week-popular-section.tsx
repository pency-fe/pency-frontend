"use client";

import NextLink from "next/link";
import { CardCarouselTemplate } from "@pency/ui/components";
import { useGenreParam } from "../../model/wt-post-home/use-genre-param";
import { WtPostOverviewCardCarousel } from "@/features/wt-episode";

export function WeekPopularSection() {
  const genre = useGenreParam();

  return (
    <CardCarouselTemplate
      CardCarousel={WtPostOverviewCardCarousel}
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
            <WtPostOverviewCardCarousel.PrevNav />
            <WtPostOverviewCardCarousel.NextNav />
          </>
        ),
      }}
    >
      <WtPostOverviewCardCarousel.Panel genre={genre} sort="WPOPULAR" />
    </CardCarouselTemplate>
  );
}
