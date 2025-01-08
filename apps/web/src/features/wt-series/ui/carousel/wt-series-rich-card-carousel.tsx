"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { RichCardCarousel } from "@pency/ui/components";
import { withAsyncBoundary } from "@pency/util";
import { ComponentProps } from "react";
import { ChannelUrlContext } from "../../model/channel-url-context";
import { GenresContext } from "../../model/genres-context";
import { SortContext } from "../../model/sort-context";
import { wtSeriesKeys, WtSeriesRichCard } from "@/entities/wt-series";
import { FeedbackButtonComponent } from "../../model/feedback-button-types";

type PanelFnProps = { FeedbackButton: FeedbackButtonComponent } & Pick<
  Exclude<Parameters<typeof wtSeriesKeys.page>[0], undefined>,
  "genres" | "sort" | "channelUrl"
>;

const PanelFn = ({ FeedbackButton, genres, sort, channelUrl }: PanelFnProps) => {
  const { data } = useSuspenseQuery(wtSeriesKeys.page({ genres, sort, channelUrl }));

  return (
    <GenresContext.Provider value={{ genres }}>
      <SortContext.Provider value={{ sort }}>
        <ChannelUrlContext.Provider value={{ channelUrl }}>
          <RichCardCarousel.Panel>
            {data.serieses.map((series, i) => (
              <RichCardCarousel.Slide key={i}>
                <WtSeriesRichCard data={series} feedbackButton={<FeedbackButton data={series} />} />
              </RichCardCarousel.Slide>
            ))}
          </RichCardCarousel.Panel>
        </ChannelUrlContext.Provider>
      </SortContext.Provider>
    </GenresContext.Provider>
  );
};

const Loading = () => {
  return (
    <RichCardCarousel.Panel>
      {Array.from({ length: 18 }, (_, i) => (
        <RichCardCarousel.Slide key={i}>
          <WtSeriesRichCard.Loading />
        </RichCardCarousel.Slide>
      ))}
    </RichCardCarousel.Panel>
  );
};

export const WtSeriesRichCardCarousel = Object.assign(
  (props: ComponentProps<typeof RichCardCarousel>) => <RichCardCarousel {...props} />,
  {
    ...RichCardCarousel,
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
