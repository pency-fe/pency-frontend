"use client";

import { Grid, Stack } from "@mui/material";
import { BannerSection } from "./banner-section";
import { PopularWebtoonPostSection } from "./popular-webtoon-post-section";
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
            <PopularWebtoonPostSection />
            <PopularWebtoonSeriesSection />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
