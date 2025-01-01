"use client";

import NextLink from "next/link";
import { CardCarouselTemplate } from "@pency/ui/components";
import { WtPostOverviewCardCarousel } from "@/features/wt-post";
import { useGenreParam } from "../../model/wt-post-home/use-genre-param";

export function LatestSection() {
  const genre = useGenreParam();

  return (
    <CardCarouselTemplate
      CardCarousel={WtPostOverviewCardCarousel}
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
            <WtPostOverviewCardCarousel.PrevNav />
            <WtPostOverviewCardCarousel.NextNav />
          </>
        ),
      }}
    >
      <WtPostOverviewCardCarousel.Panel genre={genre} />
    </CardCarouselTemplate>
  );
}
