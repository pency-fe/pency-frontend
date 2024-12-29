"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { OverviewCardCarousel } from "@pency/ui/components";
import { withAsyncBoundary } from "@pency/util";
import { WtPostOverviewCard, wtPostKeys } from "@/entities/wt-post";

export const WtPostOverviewCardCarousel = Object.assign(
  withAsyncBoundary(WtPostOverviewCardCarouselFn, {
    errorBoundary: {
      fallback: <Loading />,
    },
    suspense: {
      fallback: <Loading />,
    },
  }),
  {
    ...OverviewCardCarousel,
  },
);

type WtPostOverviewCardCarouselFnProps = Omit<
  Exclude<Parameters<typeof wtPostKeys.page>[0], undefined>,
  "page" | "creationTypes" | "pairs"
>;

function WtPostOverviewCardCarouselFn({ genre, sort, channelUrl }: WtPostOverviewCardCarouselFnProps) {
  const { data } = useSuspenseQuery(wtPostKeys.page({ genre, sort, channelUrl }));

  return (
    <OverviewCardCarousel
      slots={{
        slides: (
          <>
            {data.posts.map((post, i) => (
              <OverviewCardCarousel.Slide key={i}>
                <WtPostOverviewCard data={post} hideGenre={genre !== "ALL"} />
              </OverviewCardCarousel.Slide>
            ))}
          </>
        ),
      }}
    />
  );
}

function Loading() {
  return (
    <OverviewCardCarousel
      slots={{
        slides: (
          <>
            {Array.from({ length: 18 }, (_, i) => (
              <OverviewCardCarousel.Slide key={i}>
                <WtPostOverviewCard.Loading />
              </OverviewCardCarousel.Slide>
            ))}
          </>
        ),
      }}
    />
  );
}
