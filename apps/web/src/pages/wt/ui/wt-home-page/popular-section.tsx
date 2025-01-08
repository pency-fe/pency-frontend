"use client";

import NextLink from "next/link";
import { CardCarouselTemplate } from "@pency/ui/components";
import { WtEpisodeOverviewCardCarousel } from "@/features/wt-episode";
import { useGenreParam } from "../../model/wt-post-home/use-genre-param";

export function PopularSection() {
  const genre = useGenreParam();

  return (
    <CardCarouselTemplate
      CardCarousel={WtEpisodeOverviewCardCarousel}
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
            <WtEpisodeOverviewCardCarousel.PrevNav />
            <WtEpisodeOverviewCardCarousel.NextNav />
          </>
        ),
      }}
    >
      <WtEpisodeOverviewCardCarousel.Panel genre={genre} sort="POPULAR" />
    </CardCarouselTemplate>
  );
}
