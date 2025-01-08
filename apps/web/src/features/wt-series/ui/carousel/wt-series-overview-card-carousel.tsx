"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { OverviewCardCarousel } from "@pency/ui/components";
import { withAsyncBoundary } from "@pency/util";
import { ComponentProps } from "react";
import { wtSeriesKeys, WtSeriesOverviewCard } from "@/entities/wt-series";

type PanelFnProps = Pick<Exclude<Parameters<typeof wtSeriesKeys.page>[0], undefined>, "genres" | "sort" | "channelUrl">;

const PanelFn = ({ genres, sort, channelUrl }: PanelFnProps) => {
  const { data } = useSuspenseQuery(wtSeriesKeys.page({ genres, sort, channelUrl }));

  return (
    <OverviewCardCarousel.Panel>
      {data.serieses.map((series, i) => (
        <OverviewCardCarousel.Slide key={i}>
          <WtSeriesOverviewCard data={series} />
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
          <WtSeriesOverviewCard.Loading />
        </OverviewCardCarousel.Slide>
      ))}
    </OverviewCardCarousel.Panel>
  );
};

export const WtSeriesOverviewCardCarousel = Object.assign(
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
