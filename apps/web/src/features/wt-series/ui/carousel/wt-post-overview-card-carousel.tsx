"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { OverviewCardCarousel } from "@pency/ui/components";
import { withAsyncBoundary } from "@pency/util";
import { WtEpisodeOverviewCard, wtEpisodeKeys } from "@/entities/wt-episode";
import { ComponentProps } from "react";

type PanelFnProps = Pick<Exclude<Parameters<typeof wtEpisodeKeys.page>[0], undefined>, "genre" | "sort" | "channelUrl">;

const PanelFn = ({ genre, sort, channelUrl }: PanelFnProps) => {
  const { data } = useSuspenseQuery(wtEpisodeKeys.page({ genre, sort, channelUrl }));

  return (
    <OverviewCardCarousel.Panel>
      {data.posts.map((post, i) => (
        <OverviewCardCarousel.Slide key={i}>
          <WtEpisodeOverviewCard data={post} hideGenre={genre !== "ALL"} />
        </OverviewCardCarousel.Slide>
      ))}
    </OverviewCardCarousel.Panel>
  );
};

const Loading = () => {
  return (
    <OverviewCardCarousel.Panel>
      {Array.from({ length: 18 }, (_, i) => (
        <OverviewCardCarousel.Slide key={i}>
          <WtEpisodeOverviewCard.Loading />
        </OverviewCardCarousel.Slide>
      ))}
    </OverviewCardCarousel.Panel>
  );
};

export const WtEpisodeOverviewCardCarousel = Object.assign(
  (props: ComponentProps<typeof OverviewCardCarousel>) => <OverviewCardCarousel {...props} />,
  {
    ...OverviewCardCarousel,
    Panel: withAsyncBoundary(PanelFn, {
      errorBoundary: {
        fallback: <Loading />,
      },
      suspense: {
        fallback: <Loading />,
      },
    }),
  },
);
