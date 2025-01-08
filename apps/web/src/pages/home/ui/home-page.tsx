"use client";

import { Grid, Stack } from "@mui/material";
import { BannerSection } from "./banner-section";
import { WPopularSeriesSection } from "./week-popular-series-section";

export function HomePage() {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <BannerSection />
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={4}>
            <WPopularSeriesSection />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
