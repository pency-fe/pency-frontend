"use client";

import { ComponentProps } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { OverviewCardCarousel } from "@pency/ui/components";
import { withAsyncBoundary } from "@pency/util";
import { WtPostOverviewCard, wtPostKeys } from "@/entities/wt-post";

export const WtPostOverviewCarousel = Object.assign(
  (props: ComponentProps<typeof OverviewCardCarousel>) => <OverviewCardCarousel {...props} />,
  {
    ...OverviewCardCarousel,
    Container: withAsyncBoundary(WtPostOverviewCarouselFn, {
      errorBoundary: {
        fallback: <Loading />,
      },
      suspense: {
        fallback: <Loading />,
      },
    }),
  },
);

type WtPostOverviewCarouselFnProps = Omit<
  Exclude<Parameters<typeof wtPostKeys.page>[0], undefined>,
  "page" | "creationTypes" | "pairs"
>;

function WtPostOverviewCarouselFn({ genre, sort, channelUrl }: WtPostOverviewCarouselFnProps) {
  const { data } = useSuspenseQuery(wtPostKeys.page({ genre, sort, channelUrl }));

  return (
    <OverviewCardCarousel.Container
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
    <OverviewCardCarousel.Container
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
