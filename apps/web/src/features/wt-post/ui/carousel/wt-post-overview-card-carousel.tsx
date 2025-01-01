"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { OverviewCardCarousel } from "@pency/ui/components";
import { withAsyncBoundary } from "@pency/util";
import { WtPostOverviewCard, wtPostKeys } from "@/entities/wt-post";
import { ComponentProps } from "react";

type PanelFnProps = Pick<Exclude<Parameters<typeof wtPostKeys.page>[0], undefined>, "genre" | "sort" | "channelUrl">;

const PanelFn = ({ genre, sort, channelUrl }: PanelFnProps) => {
  const { data } = useSuspenseQuery(wtPostKeys.page({ genre, sort, channelUrl }));

  return (
    <OverviewCardCarousel.Panel>
      {data.posts.map((post, i) => (
        <OverviewCardCarousel.Slide key={i}>
          <WtPostOverviewCard data={post} hideGenre={genre !== "ALL"} />
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
          <WtPostOverviewCard.Loading />
        </OverviewCardCarousel.Slide>
      ))}
    </OverviewCardCarousel.Panel>
  );
};

export const WtPostOverviewCardCarousel = Object.assign(
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
