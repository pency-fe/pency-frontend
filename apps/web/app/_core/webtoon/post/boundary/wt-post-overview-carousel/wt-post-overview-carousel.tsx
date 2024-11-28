"use client";

import { withAsyncBoundary } from "@pency/util";
import { wtPostKeys } from "../../query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { OverviewCardCarousel } from "@pency/ui/components";
import { WT_Post_OverviewCard } from "../../ui";
import { Box, Skeleton, Stack } from "@mui/material";

export const WebToonPostOverviewCarousel = withAsyncBoundary(WebToonPostOverviewCarouselFn, {
  suspense: { fallback: <Loading /> },
  errorBoundary: {
    fallback: <Loading />,
  },
});

type WebToonPostOverviewCarouselFnProps = Parameters<typeof wtPostKeys.list>[0];

function WebToonPostOverviewCarouselFn({ genre, sort, page }: WebToonPostOverviewCarouselFnProps) {
  const { data } = useSuspenseQuery(wtPostKeys.list({ genre, page, sort }));

  return (
    <>
      <OverviewCardCarousel.Container
        slots={{
          slides: (
            <>
              {data.map((post, i) => (
                <OverviewCardCarousel.Slide key={i}>
                  <WT_Post_OverviewCard data={post} hideGenre={genre !== "ALL"} />
                </OverviewCardCarousel.Slide>
              ))}
            </>
          ),
        }}
      />
    </>
  );
}

function Loading() {
  return (
    <>
      {Array.from({ length: 18 }, (_, i) => (
        <OverviewCardCarousel.Slide key={i}>
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
        </OverviewCardCarousel.Slide>
      ))}
    </>
  );
}
