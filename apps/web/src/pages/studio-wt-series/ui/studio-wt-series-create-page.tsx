"use client";

import { WTSeriesForm } from "@/features/wt-series-me";
import { Box, Grid, Skeleton, Stack } from "@mui/material";

export const StudioWtSeriesCreatePage = () => {
  return (
    <WTSeriesForm>
      <Stack spacing={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} md="auto">
            <Stack spacing={1} sx={{ alignItems: "center" }}>
              <WTSeriesForm.Image />
            </Stack>
          </Grid>
          <Grid item xs={12} md>
            <Stack spacing={4}>
              <WTSeriesForm.Status />
              <WTSeriesForm.Genre />
              <WTSeriesForm.title />
              <WTSeriesForm.description />
              <WTSeriesForm.keywords />
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <WTSeriesForm.CreateSubmit />
        </Box>
      </Stack>
    </WTSeriesForm>
  );
};
