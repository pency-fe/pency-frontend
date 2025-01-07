"use client";

import NextLink from "next/link";
import { CardCarouselTemplate } from "@pency/ui/components";
import { WtEpisodeOverviewCardCarousel } from "@/features/wt-episode";
import { useGenreParam } from "../../model/wt-post-home/use-genre-param";

export function LatestSection() {
  const genre = useGenreParam();

  return (
    <CardCarouselTemplate
      CardCarousel={WtEpisodeOverviewCardCarousel}
      slots={{
        title: <CardCarouselTemplate.Title>최신 포스트</CardCarouselTemplate.Title>,
        moreButton: (
          <CardCarouselTemplate.MoreButton
            component={NextLink}
            href={genre === "ALL" ? "/webtoon/post/list" : `/webtoon/post/list?genre=${genre}`}
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
      <WtEpisodeOverviewCardCarousel.Panel genre={genre} />
    </CardCarouselTemplate>
  );
}
