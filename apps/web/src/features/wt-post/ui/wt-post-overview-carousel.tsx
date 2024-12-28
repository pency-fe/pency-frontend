"use client";

import { ComponentProps } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { OverviewCardCarousel } from "@pency/ui/components";
import { withAsyncBoundary } from "@pency/util";
import { WT_Post_OverviewCard, wtPostKeys } from "@/entities/wt-post";

export const WT_Post_OverviewCarousel = Object.assign(
  (props: ComponentProps<typeof OverviewCardCarousel>) => <OverviewCardCarousel {...props} />,
  {
    ...OverviewCardCarousel,
    Container: withAsyncBoundary(WT_Post_OverviewCarousel_Fn, {
      errorBoundary: {
        fallback: <Loading />,
      },
      suspense: {
        fallback: <Loading />,
      },
    }),
  },
);

type WT_Post_OverviewCarousel_Fn_Props = Omit<
  Exclude<Parameters<typeof wtPostKeys.page>[0], undefined>,
  "page" | "creationTypes" | "pairs"
>;

function WT_Post_OverviewCarousel_Fn({ genre, sort, channelUrl }: WT_Post_OverviewCarousel_Fn_Props) {
  const { data } = useSuspenseQuery(wtPostKeys.page({ genre, sort, channelUrl }));

  return (
    <OverviewCardCarousel.Container
      slots={{
        slides: (
          <>
            {data.posts.map((post, i) => (
              <OverviewCardCarousel.Slide key={i}>
                <WT_Post_OverviewCard data={post} hideGenre={genre !== "ALL"} />
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
                <WT_Post_OverviewCard.Loading />
              </OverviewCardCarousel.Slide>
            ))}
          </>
        ),
      }}
    />
  );
}
