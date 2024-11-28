"use client";

import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSearchParams } from "next/navigation";
import NextLink from "next/link";
import { stylesColorScheme } from "@pency/ui/util";
import { useMemo } from "react";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { WT_Post_OverviewList } from "_core/webtoon/post";

export function LatestSection() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const searchParams = useSearchParams();

  const genreParam = useMemo(() => {
    const param = searchParams.get("genre");
    if (param && Object.keys(GENRE_LABEL).includes(param)) {
      return param as Genre;
    }
    return "ALL" as const;
  }, [searchParams]);

  return (
    <Stack spacing={1}>
      <WT_Post_OverviewList>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4">최신 포스트</Typography>
          <Button
            component={NextLink}
            href={genreParam !== "ALL" ? `/webtoon/post/list?genre=${genreParam}` : "/webtoon/post/list"}
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
          <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
            <WT_Post_OverviewList.PrevNav size={isUpMd ? "medium" : "small"} />
            <WT_Post_OverviewList.NextNav size={isUpMd ? "medium" : "small"} />
          </Stack>
        </Box>
        <WT_Post_OverviewList.Container genre={genreParam} sort={"LATEST"} page={1} />
      </WT_Post_OverviewList>
    </Stack>
  );
}
