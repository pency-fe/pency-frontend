"use client";

import { WtSeriesForm } from "@/features/wt-series-me";
import { Box, Grid, Skeleton, Stack } from "@mui/material";

export const StudioWtSeriesUpdatePage = () => {
  return (
    <WtSeriesForm>
      <Stack spacing={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} md="auto">
            <Stack spacing={1} sx={{ alignItems: "center" }}>
              <WtSeriesForm.Image />
            </Stack>
          </Grid>
          <Grid item xs={12} md>
            <Stack spacing={4}>
              <WtSeriesForm.Status />
              <WtSeriesForm.Genre />
              <WtSeriesForm.title />
              <WtSeriesForm.description />
              <WtSeriesForm.keywords />
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <WtSeriesForm.CreateSubmit />
        </Box>
      </Stack>
    </WtSeriesForm>
  );
};

const Loading = () => {
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
            <Skeleton width="100%" height={66} />
            <Skeleton width="100%" height={56} />
            <Skeleton width="100%" height={80} />
            <Skeleton width="100%" height={117} />
            <Skeleton width="100%" height={110} />
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Skeleton width={115} height={36} />
      </Box>
    </Stack>
  );
};
