"use client";

import { Grid, useTheme } from "@mui/material";
import { SeriesSection } from "./series-section";
import { EpisodeSection } from "./episode-section";

export const ChannelUrlWebtoonSeriesPage = () => {
  const theme = useTheme();
  // 여기 부분은 구조 잡는 부분 (Grid)
  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        <SeriesSection />
      </Grid>
      <Grid
        item
        xs
        sx={{
          [theme.breakpoints.up("md")]: {
            ml: 1,
          },
          [theme.breakpoints.down("md")]: {
            mt: 1,
          },
        }}
      >
        <EpisodeSection />
      </Grid>
    </Grid>
  );
};

// ----------------------------------------------------------------------
