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

export const WtPostRichCardCarousel = Object.assign(
  withAsyncBoundary(WtPostRichCardCarouselFn, {
    errorBoundary: {
      fallback: <Loading />,
    },
    suspense: {
      fallback: <Loading />,
    },
  }),
  {
    ...RichCardCarousel,
  },
);

type WtPostRichCardCarouselFnProps = Omit<
  Exclude<Parameters<typeof wtPostKeys.page>[0], undefined>,
  "page" | "creationTypes" | "pairs"
>;

function WtPostRichCardCarouselFn({ genre, sort, channelUrl }: WtPostRichCardCarouselFnProps) {
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
    <RichCardCarousel
      slots={{
        slides: (
          <>
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
          </>
        ),
      }}
    />
  );
}

function Loading() {
  return (
    <RichCardCarousel
      slots={{
        slides: (
          <>
            {Array.from({ length: 18 }, (_, i) => (
              <RichCardCarousel.Slide key={i}>
                <WtPostRichCard.Loading />
              </RichCardCarousel.Slide>
            ))}
          </>
        ),
      }}
    />
  );
}
