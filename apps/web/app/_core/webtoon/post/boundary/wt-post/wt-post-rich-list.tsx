"use client";

import { withAsyncBoundary } from "@pency/util";
import { useSuspenseQuery } from "@tanstack/react-query";
import { wtPostKeys } from "../../query";
import { Box, Grid, Skeleton, Stack } from "@mui/material";
import { WT_Post_RichCard } from "../../ui";
import React from "react";

export const WT_Post_RichList = withAsyncBoundary(WT_Post_RichListFn, {
  suspense: { fallback: <Loading /> },
  errorBoundary: {
    fallback: <Loading />,
  },
});

type WT_Post_RichListFnProps = Parameters<typeof wtPostKeys.list>[0];

function WT_Post_RichListFn({ genre, sort, page }: WT_Post_RichListFnProps) {
  const { data } = useSuspenseQuery(wtPostKeys.list({ genre, sort, page }));

  return (
    <Grid container spacing={1}>
      {data.map((post, i) => (
        <Grid item key={i} xs={12} sm={6} md={4}>
          <WT_Post_RichCard data={post} hideGenre={genre !== "ALL"} />
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
