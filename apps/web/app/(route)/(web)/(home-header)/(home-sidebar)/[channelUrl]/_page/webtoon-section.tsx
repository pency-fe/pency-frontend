"use client";

import NextLink from "next/link";
import { Stack, Box, Typography, RadioGroup, Button, useTheme } from "@mui/material";
import { RadioButton } from "@pency/ui/components";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { objectEntries } from "@pency/util";
import { WT_Post_Channel_RichCarousel } from "_core/webtoon/post";
import { stylesColorScheme } from "@pency/ui/util";

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

  const { channelUrl } = useParams();
  const decodedChannelUrl = useMemo(() => {
    return decodeURIComponent(channelUrl as string);
  }, [channelUrl]);

  const webtoon = useMemo(() => objectEntries(WEBTOON_VALUE_LABEL), []);
  const webtoonParam = useMemo(() => {
    const param = searchParams.get("webtoon");
    if (param && Object.keys(WEBTOON_VALUE_LABEL).includes(param)) {
      return param as webtoonValue;
    }

    return "POST" as webtoonValue;
  }, [searchParams]);

  return (
    <Stack spacing={1}>
      <WT_Post_Channel_RichCarousel>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4">웹툰</Typography>
        </Box>

        {/* 라디오 버튼 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <RadioGroup value={webtoonParam}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {webtoon.map(([webtoon, label]) => (
                <RadioButton
                  value={webtoon}
                  key={webtoon}
                  LinkComponent={NextLink}
                  href={`/${decodedChannelUrl}/?webtoon=${webtoon}`}
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
              href={`${decodedChannelUrl}/webtoon?webtoon=${webtoonParam}`}
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

        <WT_Post_Channel_RichCarousel.Container channelUrl={decodedChannelUrl} sort="LATEST" page={1} />
      </WT_Post_Channel_RichCarousel>
    </Stack>
  );
}
