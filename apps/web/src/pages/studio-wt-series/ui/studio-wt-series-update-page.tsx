"use client";

import { wtSeriesMeKeys } from "@/entities/wt-series-me";
import { WtSeriesUpdateForm } from "@/features/wt-series-me";
import { Box, Grid, Skeleton, Stack } from "@mui/material";
import { withAsyncBoundary } from "@pency/util";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const StudioWtSeriesUpdatePage = withAsyncBoundary(
  () => {
    const { seriesId } = useParams<{ seriesId: string }>();
    const { data } = useSuspenseQuery(wtSeriesMeKeys.detail({ id: Number(seriesId) }));

    return (
      <WtSeriesUpdateForm data={data}>
        <Stack spacing={3}>
          <Grid container spacing={4}>
            <Grid item xs={12} md="auto">
              <Stack spacing={1} sx={{ alignItems: "center" }}>
                <WtSeriesUpdateForm.Image />
              </Stack>
            </Grid>
            <Grid item xs={12} md>
              <Stack spacing={4}>
                <WtSeriesUpdateForm.Status />
                <WtSeriesUpdateForm.Genre />
                <WtSeriesUpdateForm.title />
                <WtSeriesUpdateForm.description />
                <WtSeriesUpdateForm.keywords />
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <WtSeriesUpdateForm.UpdateSubmit />
          </Box>
        </Stack>
      </WtSeriesUpdateForm>
    );
  },
  { errorBoundary: { fallback: <Loading /> }, suspense: { fallback: <Loading /> } },
);

function Loading() {
  return (
    <Stack spacing={3}>
      <Grid container spacing={4}>
        <Grid item xs={12} md="auto">
          <Stack spacing={1} sx={{ alignItems: "center" }}>
            <Skeleton width={260} height={212} />
          </Stack>
        </Grid>
        <Grid item xs={12} md>
          <Stack spacing={4}>
            <Skeleton height={66} />
            <Skeleton height={56} />
            <Skeleton height={80} />
            <Skeleton height={117} />
            <Skeleton height={110} />
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Skeleton width={115} height={36} />
      </Box>
    </Stack>
  );
}
