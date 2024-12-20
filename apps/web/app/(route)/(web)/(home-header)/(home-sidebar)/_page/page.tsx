"use client";

import { Grid, Stack } from "@mui/material";
import { BannerSection } from "./banner-section";
import { WPopularSeriesSection } from "./week-popular-series-section";
import { PopularWebtoonSeriesSection } from "./popular-webtoon-series-section";

export default function HomeSidebarPage() {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <BannerSection />
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={4}>
            <WPopularSeriesSection />
            <PopularWebtoonSeriesSection />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
