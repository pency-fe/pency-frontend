"use client";

import { Box, Grid, Skeleton, Stack } from "@mui/material";

export const StudioWtSeriesCreatePage = () => {
  return (
    <Stack spacing={3}>
      <Grid container spacing={4}>
        <Grid item xs={12} md="auto">
          <Stack spacing={1} sx={{ alignItems: "center" }}>
            <Skeleton width="260px" height="120px" />
            <Box sx={{ display: "flex" }}>
              <Skeleton width="80px" height="20px" />
              <Skeleton width="80px" height="20px" />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md>
          <Stack spacing={4}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Stack>
        </Grid>
      </Grid>
      <Skeleton width="80px" height="20px" sx={{ alignSelf: "flex-end" }} />
    </Stack>
  );
};
