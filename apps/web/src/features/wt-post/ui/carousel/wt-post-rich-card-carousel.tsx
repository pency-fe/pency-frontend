"use client";

import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { produce } from "immer";
import { RichCardCarousel } from "@pency/ui/components";
import { withAsyncBoundary } from "@pency/util";
import { wtPostKeys, WtPostRichCard } from "@/entities/wt-post";
import { useBookmark } from "../../model/use-bookmark";
import { useUnbookmark } from "../../model/use-unbookmark";
import { useBlock } from "../../model/use-block";
import { useUnblock } from "../../model/use-unblock";
import { useChannelMeListContext } from "@/entities/channel-me";
import { ComponentProps } from "react";

type PanelFnProps = Pick<Exclude<Parameters<typeof wtPostKeys.page>[0], undefined>, "genre" | "sort" | "channelUrl">;

const PanelFn = ({ genre, sort, channelUrl }: PanelFnProps) => {
  const { data } = useSuspenseQuery(wtPostKeys.page({ genre, sort, channelUrl }));
  const queryClient = useQueryClient();

  const channelMeList = useChannelMeListContext();

  const bookmark = useBookmark();
  const unbookmark = useUnbookmark();
  const block = useBlock();
  const unblock = useUnblock();

  const handleBookmark = (id: number) => {
    bookmark({ id }, () => {
      queryClient.setQueryData(
        wtPostKeys.page({ genre, sort, channelUrl }).queryKey,
        (oldData) =>
          oldData &&
          produce(oldData, (draft) => {
            draft.posts.find((post) => post.id === id)!.bookmark = true;
          }),
      );
    });
  };

  const handleUnbookmark = (id: number) => {
    unbookmark({ id }, () => {
      queryClient.setQueryData(
        wtPostKeys.page({ genre, sort, channelUrl }).queryKey,
        (oldData) =>
          oldData &&
          produce(oldData, (draft) => {
            draft.posts.find((post) => post.id === id)!.bookmark = false;
          }),
      );
    });
  };

  const handleBlock = (id: number) => {
    block({ id }, () => {
      queryClient.setQueryData(
        wtPostKeys.page({ genre, sort, channelUrl }).queryKey,
        (oldData) =>
          oldData &&
          produce(oldData, (draft) => {
            draft.posts.find((post) => post.channel.id === id)!.block = true;
          }),
      );
    });
  };

  const handleUnblock = (id: number) => {
    unblock({ id }, () => {
      queryClient.setQueryData(
        wtPostKeys.page({ genre, sort, channelUrl }).queryKey,
        (oldData) =>
          oldData &&
          produce(oldData, (draft) => {
            draft.posts.find((post) => post.channel.id === id)!.block = false;
          }),
      );
    });
  };

  return (
    <RichCardCarousel.Panel>
      {data.posts.map((post, i) => (
        <RichCardCarousel.Slide key={i}>
          <WtPostRichCard
            data={post}
            onBookmark={handleBookmark}
            onUnbookmark={handleUnbookmark}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
            isMyPost={channelMeList ? channelMeList.some((channel) => channel.id === post.channel.id) : false}
          />
        </RichCardCarousel.Slide>
      ))}
    </RichCardCarousel.Panel>
  );
};

const Loading = () => {
  return (
    <RichCardCarousel>
      {Array.from({ length: 18 }, (_, i) => (
        <RichCardCarousel.Slide key={i}>
          <WtPostRichCard.Loading />
        </RichCardCarousel.Slide>
      ))}
    </RichCardCarousel>
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
