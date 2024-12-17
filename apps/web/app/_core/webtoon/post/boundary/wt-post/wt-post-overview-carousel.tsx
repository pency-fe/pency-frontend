"use client";

import { withAsyncBoundary } from "@pency/util";
import { wtPostKeys } from "../../query";
import { useQuery } from "@tanstack/react-query";
import { OverviewCardCarousel } from "@pency/ui/components";
import { WT_Post_OverviewCard } from "../../ui";
import { Box, Skeleton, Stack } from "@mui/material";
import { ComponentProps } from "react";

export const WT_Post_OverviewCarousel = Object.assign(
  (props: ComponentProps<typeof OverviewCardCarousel>) => <OverviewCardCarousel {...props} />,
  {
    ...OverviewCardCarousel,
    Container: withAsyncBoundary(WT_Post_OverviewCarousel_Fn, {
      errorBoundary: {
        fallback: <Loading />,
      },
    }),
  },
);

type Props = Omit<Exclude<Parameters<typeof wtPostKeys.page>[0], undefined>, "page" | "creationTypes" | "pairs">;

type WT_Post_OverviewCarousel_Fn_Props = Omit<Props, "genre"> & Required<Pick<Props, "genre">>;

function WT_Post_OverviewCarousel_Fn({ genre, sort }: WT_Post_OverviewCarousel_Fn_Props) {
  const { status, data } = useQuery({
    ...wtPostKeys.page({ genre, sort }),
    throwOnError: true,
  });

  if (status !== "success") {
    return <Loading />;
  }

  return (
    <OverviewCardCarousel.Container
      slots={{
        slides: (
          <>
            {data.posts.map((post, i) => (
              <OverviewCardCarousel.Slide key={i}>
                <WT_Post_OverviewCard data={post} hideGenre={genre !== "ALL"} />
              </OverviewCardCarousel.Slide>
            ))}
          </>
        ),
      }}
    />
  );
}

function Loading() {
  return (
    <OverviewCardCarousel.Container
      slots={{
        slides: (
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
        ),
      }}
    />
  );
}
