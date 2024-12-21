"use client";

import NextLink from "next/link";
import { Box, RadioGroup } from "@mui/material";
import { CardTabCarouselTemplate, RadioButton } from "@pency/ui/components";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { objectEntries } from "@pency/util";
import { WT_Post_Channel_RichCarousel } from "_core/webtoon/post";
import { useChannelUrlParam } from "_hooks";

// ----------------------------------------------------------------------

type webtoonValue = "POST" | "SERIES";

const WEBTOON_VALUE_LABEL: Record<webtoonValue, string> = {
  POST: "포스트",
  SERIES: "시리즈",
} as const;

// ----------------------------------------------------------------------

export function WebtoonSection() {
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
    <CardTabCarouselTemplate
      CardCarousel={WT_Post_Channel_RichCarousel}
      slots={{
        title: <CardTabCarouselTemplate.Title>웹툰</CardTabCarouselTemplate.Title>,
        tabs: (
          <RadioGroup value={webtoonParam}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {webtoon.map(([webtoon, label]) => (
                <RadioButton
                  LinkComponent={NextLink}
                  value={webtoon}
                  key={webtoon}
                  href={`/${channelUrl}/?webtoon=${webtoon}`}
                  sx={{ flexShrink: 0 }}
                >
                  {label}
                </RadioButton>
              ))}
            </Box>
          </RadioGroup>
        ),
        moreButton: (
          <CardTabCarouselTemplate.MoreButton
            component={NextLink}
            href={`/${channelUrl}/webtoon?webtoon=${webtoonParam}`}
          />
        ),
        prevNextNav: (
          <>
            <WT_Post_Channel_RichCarousel.PrevNav />
            <WT_Post_Channel_RichCarousel.NextNav />
          </>
        ),
        container: <WT_Post_Channel_RichCarousel.Container url={channelUrl.replace("@", "")} sort="LATEST" page={1} />,
      }}
    />
  );
}
