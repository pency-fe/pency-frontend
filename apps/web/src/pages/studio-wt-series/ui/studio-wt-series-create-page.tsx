"use client";

import { WtSeriesForm } from "@/features/wt-series-me";
import { Box, Grid, Stack } from "@mui/material";

export const StudioWtSeriesCreatePage = () => {
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
