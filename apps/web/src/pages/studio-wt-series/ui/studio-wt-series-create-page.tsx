"use client";

import { WtSeriesCreateForm } from "@/features/wt-series-me";
import { Box, Grid, Stack } from "@mui/material";

export const StudioWtSeriesCreatePage = () => {
  return (
    <WtSeriesCreateForm>
      <Stack spacing={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} md="auto">
            <Stack spacing={1} sx={{ alignItems: "center" }}>
              <WtSeriesCreateForm.Image />
            </Stack>
          </Grid>
          <Grid item xs={12} md>
            <Stack spacing={4}>
              <WtSeriesCreateForm.Status />
              <WtSeriesCreateForm.Genre />
              <WtSeriesCreateForm.title />
              <WtSeriesCreateForm.description />
              <WtSeriesCreateForm.keywords />
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <WtSeriesCreateForm.CreateSubmit />
        </Box>
      </Stack>
    </WtSeriesCreateForm>
  );
};
