"use client";

import NextLink from "next/link";
import { Stack, Box, Typography, RadioGroup, Button, useTheme } from "@mui/material";
import { RadioButton } from "@pency/ui/components";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { objectEntries } from "@pency/util";
import { WT_Post_Channel_RichCarousel } from "_core/webtoon/post";
import { stylesColorScheme } from "@pency/ui/util";
import { useChannelUrlParam } from "_hooks";

// ----------------------------------------------------------------------

type webtoonValue = "POST" | "SERIES";

const WEBTOON_VALUE_LABEL: Record<webtoonValue, string> = {
  POST: "포스트",
  SERIES: "시리즈",
} as const;

// ----------------------------------------------------------------------

export function WebtoonSection() {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const channelUrl = useChannelUrlParam();

  const webtoon = useMemo(() => objectEntries(WEBTOON_VALUE_LABEL), []);
  const webtoonParam = useMemo(() => {
    const param = searchParams.get("webtoon");
    if (param && Object.keys(WEBTOON_VALUE_LABEL).includes(param)) {
      return param as webtoonValue;
    }

    return "POST" as webtoonValue;
  }, [searchParams]);

  return (
    <WT_Post_Channel_RichCarousel>
      <Stack spacing={1}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4">웹툰</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <RadioGroup value={webtoonParam}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {webtoon.map(([webtoon, label]) => (
                <RadioButton
                  value={webtoon}
                  key={webtoon}
                  LinkComponent={NextLink}
                  href={`/${channelUrl}/?webtoon=${webtoon}`}
                  sx={{ flexShrink: 0 }}
                >
                  {label}
                </RadioButton>
              ))}
            </Box>
          </RadioGroup>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
            <Button
              component={NextLink}
              href={`${channelUrl}/webtoon?webtoon=${webtoonParam}`}
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
            <WT_Post_Channel_RichCarousel.PrevNav />
            <WT_Post_Channel_RichCarousel.NextNav />
          </Box>
        </Box>

        <WT_Post_Channel_RichCarousel.Container channelUrl={channelUrl} sort="LATEST" page={1} />
      </Stack>
    </WT_Post_Channel_RichCarousel>
  );
}
