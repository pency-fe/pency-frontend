"use client";

import NextLink from "next/link";
import { Stack, Box, Typography, RadioGroup, Button, useTheme, buttonBaseClasses } from "@mui/material";
import { RadioButton } from "@pency/ui/components";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { objectEntries } from "@pency/util";
import { WT_Post_Channel_RichCarousel } from "_core/webtoon/post";
import { stylesColorScheme } from "@pency/ui/util";

// ----------------------------------------------------------------------

type contentValue = "POST" | "SERIES";

const CONTENT_VALUE_LABEL: Record<contentValue, string> = {
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

  const content = useMemo(() => objectEntries(CONTENT_VALUE_LABEL), []);
  const contentParam = useMemo(() => {
    const param = searchParams.get("content");
    if (param && Object.keys(CONTENT_VALUE_LABEL).includes(param)) {
      return param as contentValue;
    }

    return "POST" as contentValue;
  }, [searchParams]);

  return (
    <Stack spacing={1}>
      <WT_Post_Channel_RichCarousel>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4">웹툰</Typography>
        </Box>

        {/* 라디오 버튼 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <RadioGroup value={contentParam}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {content.map(([content, label]) => (
                <RadioButton
                  value={content}
                  key={content}
                  LinkComponent={NextLink}
                  href={`/${decodedChannelUrl}/?content=${content}`}
                  sx={{ flexShrink: 0 }}
                >
                  {label}
                </RadioButton>
              ))}
            </Box>
          </RadioGroup>
          <Button
            component={NextLink}
            href={`${decodedChannelUrl}/webtoon/list?content=${contentParam}&genre=ALL&sort=LATEST&page=0`}
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
          <Box sx={{ display: "flex", alignItems: "center", ml: "auto", gap: 1 }}>
            <WT_Post_Channel_RichCarousel.PrevNav
              sx={{
                [`& .${buttonBaseClasses.root}`]: {
                  [theme.breakpoints.up("xs")]: {
                    width: 30,
                    height: 30,
                  },
                  [theme.breakpoints.up("md")]: {
                    width: 36,
                    height: 36,
                  },
                },
              }}
            />
            <WT_Post_Channel_RichCarousel.NextNav
              sx={{
                [`& .${buttonBaseClasses.root}`]: {
                  [theme.breakpoints.up("xs")]: {
                    width: 30,
                    height: 30,
                  },
                  [theme.breakpoints.up("md")]: {
                    width: 36,
                    height: 36,
                  },
                },
              }}
            />
          </Box>
        </Box>

        <WT_Post_Channel_RichCarousel.Container channelUrl={decodedChannelUrl} sort="LATEST" page={0} />
      </WT_Post_Channel_RichCarousel>
    </Stack>
  );
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
