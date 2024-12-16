"use client";

import { withAsyncBoundary } from "@pency/util";
import { useQuery } from "@tanstack/react-query";
import { Box, Grid, Skeleton, Stack } from "@mui/material";
import { WT_Post_RichCard } from "../../ui";
import React from "react";
import { wtPostChannelKeys } from "../../query";

export const WT_Post_Channel_RichList = withAsyncBoundary(WT_Post_Channel_RichListFn, {
  errorBoundary: {
    fallback: <Loading />,
  },
});

type WT_Post_Channel_RichListFnProps = Parameters<typeof wtPostChannelKeys.list>[0];

function WT_Post_Channel_RichListFn({ channelUrl, sort, page }: WT_Post_Channel_RichListFnProps) {
  const { status, data } = useQuery({ ...wtPostChannelKeys.list({ channelUrl, sort, page }), throwOnError: true });

  if (status !== "success") {
    return <Loading />;
  }

  return (
    <Grid container spacing={1}>
      {data.map((post, i) => (
        <Grid item key={i} xs={12} sm={6} md={4}>
          <WT_Post_RichCard data={post} />
        </Grid>
      ))}
    </Grid>
  );
}

function Loading() {
  return (
    <Grid container spacing={1}>
      {Array.from({ length: 18 }, (_, i) => (
        <Grid item key={i} xs={12} sm={6} md={4} sx={{ mb: 1.5 }}>
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
        </Grid>
      ))}
    </Grid>
  );
}
