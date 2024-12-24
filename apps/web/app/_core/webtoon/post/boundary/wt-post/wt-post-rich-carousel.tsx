"use client";

import { ComponentProps } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Skeleton, Stack } from "@mui/material";
import { RichCardCarousel } from "@pency/ui/components";
import { withAsyncBoundary } from "@pency/util";
import { WT_Post_RichCard } from "../../ui";
import { wtPostKeys } from "../../query";
import { produce } from "immer";

export const WT_Post_RichCarousel = Object.assign(
  (props: ComponentProps<typeof RichCardCarousel>) => <RichCardCarousel {...props} />,
  {
    ...RichCardCarousel,
    Container: withAsyncBoundary(WT_Post_RichCarousel_Fn, {
      errorBoundary: {
        fallback: <Loading />,
      },
    }),
  },
);

type WT_Post_RichCarousel_Fn_Props = Omit<
  Exclude<Parameters<typeof wtPostKeys.page>[0], undefined>,
  "page" | "creationTypes" | "pairs"
>;

function WT_Post_RichCarousel_Fn({ genre, sort, channelUrl }: WT_Post_RichCarousel_Fn_Props) {
  const { status, data } = useQuery({
    ...wtPostKeys.page({ genre, sort, channelUrl }),
    throwOnError: true,
  });
  const queryClient = useQueryClient();

  if (status !== "success") {
    return <Loading />;
  }

  const handleBookmark = (id: number) => {
    queryClient.setQueryData(
      wtPostKeys.page({ genre, sort, channelUrl }).queryKey,
      (oldData) =>
        oldData &&
        produce(oldData, (draft) => {
          draft.posts.find((post) => post.id === id)!.bookmark = true;
        }),
    );
  };

  const handleUnbookmark = (id: number) => {
    queryClient.setQueryData(
      wtPostKeys.page({ genre, sort, channelUrl }).queryKey,
      (oldData) =>
        oldData &&
        produce(oldData, (draft) => {
          draft.posts.find((post) => post.id === id)!.bookmark = false;
        }),
    );
  };

  const handleBlock = (id: number) => {
    queryClient.setQueryData(
      wtPostKeys.page({ genre, sort, channelUrl }).queryKey,
      (oldData) =>
        oldData &&
        produce(oldData, (draft) => {
          draft.posts.find((post) => post.channel.id === id)!.block = true;
        }),
    );
  };

  const handleUnblock = (id: number) => {
    queryClient.setQueryData(
      wtPostKeys.page({ genre, sort, channelUrl }).queryKey,
      (oldData) =>
        oldData &&
        produce(oldData, (draft) => {
          draft.posts.find((post) => post.channel.id === id)!.block = false;
        }),
    );
  };

  return (
    <RichCardCarousel.Container
      slots={{
        slides: (
          <>
            {data.posts.map((post, i) => (
              <RichCardCarousel.Slide key={i}>
                <WT_Post_RichCard
                  data={post}
                  onBlock={handleBlock}
                  onBookmark={handleBookmark}
                  onUnblock={handleUnblock}
                  onUnbookmark={handleUnbookmark}
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
    <RichCardCarousel.Container
      slots={{
        slides: (
          <>
            {Array.from({ length: 18 }, (_, i) => (
              <RichCardCarousel.Slide key={i}>
                <Stack gap={1.5}>
                  <Skeleton animation="wave" sx={{ height: "auto", aspectRatio: "16/9" }} />
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Skeleton variant="circular" animation="wave" width={36} height={36} />
                    <Stack sx={{ flex: "1 1 auto", gap: 0.5 }}>
                      <Skeleton animation="wave" height={14} />
                      <Skeleton animation="wave" height={12} />
                    </Stack>
                  </Box>
                </Stack>
              </RichCardCarousel.Slide>
            ))}
          </>
        ),
      }}
    />
  );
}
