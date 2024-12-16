"use client";

import { RichCardCarousel } from "@pency/ui/components";
import { withAsyncBoundary } from "@pency/util";
import { ComponentProps } from "react";
import { wtPostChannelKeys } from "../../query";
import { useQuery } from "@tanstack/react-query";
import { WT_Post_RichCard } from "../../ui";
import { Box, Skeleton, Stack } from "@mui/material";

export const WT_Post_Channel_RichCarousel = Object.assign(
  (props: ComponentProps<typeof RichCardCarousel>) => <RichCardCarousel {...props} />,
  {
    ...RichCardCarousel,
    Container: withAsyncBoundary(WT_Post_Channel_RichCarousel_Fn, {
      errorBoundary: {
        fallback: <Loading />,
      },
    }),
  },
);

type WT_Post_Channel_RichCarousel_Fn_Props = Parameters<typeof wtPostChannelKeys.list>[0];

function WT_Post_Channel_RichCarousel_Fn({ channelUrl, sort, page }: WT_Post_Channel_RichCarousel_Fn_Props) {
  const { status, data } = useQuery({ ...wtPostChannelKeys.list({ channelUrl, sort, page }), throwOnError: true });

  if (status !== "success") {
    return <Loading />;
  }

  return (
    <RichCardCarousel.Container
      slots={{
        slides: (
          <>
            {data.posts.map((post, i) => (
              <RichCardCarousel.Slide key={i}>
                <WT_Post_RichCard data={post} />
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
