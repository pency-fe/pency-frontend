"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { RichCardCarousel } from "@pency/ui/components";
import { withAsyncBoundary } from "@pency/util";
import { wtEpisodeKeys, WtPostRichCard } from "@/entities/wt-episode";
import { ComponentProps } from "react";
import { ChannelUrlContext } from "../../model/channel-url-context";
import { GenreContext } from "../../model/genre-context";
import { SortContext } from "../../model/sort-context";

type PanelFnProps = { Menu: ComponentProps<typeof WtPostRichCard>["Menu"] } & Pick<
  Exclude<Parameters<typeof wtEpisodeKeys.page>[0], undefined>,
  "genre" | "sort" | "channelUrl"
>;

const PanelFn = ({ Menu, genre, sort, channelUrl }: PanelFnProps) => {
  const { data } = useSuspenseQuery(wtEpisodeKeys.page({ genre, sort, channelUrl }));

  return (
    <GenreContext.Provider value={{ genre }}>
      <SortContext.Provider value={{ sort }}>
        <ChannelUrlContext.Provider value={{ channelUrl }}>
          <RichCardCarousel.Panel>
            {data.posts.map((post, i) => (
              <RichCardCarousel.Slide key={i}>
                <WtPostRichCard data={post} Menu={Menu} />
              </RichCardCarousel.Slide>
            ))}
          </RichCardCarousel.Panel>
        </ChannelUrlContext.Provider>
      </SortContext.Provider>
    </GenreContext.Provider>
  );
};

const Loading = () => {
  return (
    <RichCardCarousel.Panel>
      {Array.from({ length: 18 }, (_, i) => (
        <RichCardCarousel.Slide key={i}>
          <WtPostRichCard.Loading />
        </RichCardCarousel.Slide>
      ))}
    </RichCardCarousel.Panel>
  );
};

export const WtPostRichCardCarousel = Object.assign(
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
