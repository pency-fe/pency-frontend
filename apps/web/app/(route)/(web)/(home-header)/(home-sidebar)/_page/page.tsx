"use client";

import NextLink from "next/link";
import { Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import { stylesColorScheme } from "@pency/ui/util";
import { BannerSection } from "./banner-section";
import { WeekPopularWebtoonSection } from "./week-popular-webtoon-section";

export default function HomeSidebarPage() {
  const theme = useTheme();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <BannerSection />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" sx={{ mb: 1.5 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            주간 인기 웹툰
          </Typography>
          <Button
            component={NextLink}
            href="/webtoon/series?TODO=TODO"
            size="small"
            color="inherit"
            sx={{
              color: theme.vars.palette.grey[500],
              [stylesColorScheme.dark]: {
                color: theme.vars.palette.grey[500],
              },
            }}
          >
            더 보기
          </Button>
        </Stack>
        <WeekPopularWebtoonSection />
      </Grid>
    </Grid>
  );
}
