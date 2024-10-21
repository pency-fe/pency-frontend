import Grid2 from "@mui/material/Unstable_Grid2";
import { BannerSection, PopularWebtoonSeriesSection } from "./sections";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import NextLink from "next/link";
import { stylesColorScheme } from "@pency/ui/util";

export function Page() {
  const theme = useTheme();
  return (
    <Grid2 container spacing={4} disableEqualOverflow>
      <Grid2 xs={12}>
        <BannerSection />
      </Grid2>
      <Grid2 xs={12}>
        <Stack direction="row" alignItems="center" sx={{ mb: 1.5 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            인기 웹툰 시리즈
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
        <PopularWebtoonSeriesSection />
      </Grid2>
    </Grid2>
  );
}
