"use client";

import NextLink from "next/link";
import { Box, RadioGroup } from "@mui/material";
import { CardTabCarouselTemplate, RadioButton } from "@pency/ui/components";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { objectEntries } from "@pency/util";
import { WT_Post_RichCarousel } from "_core/webtoon/post";
import { useChannelUrlParam } from "_hooks";

// ----------------------------------------------------------------------

type WEBTOON_TAB_VALUE = "POST" | "SERIES";

const WEBTOON_TAB_VALUE_LABEL: Record<WEBTOON_TAB_VALUE, string> = {
  POST: "포스트",
  SERIES: "시리즈",
} as const;

// ----------------------------------------------------------------------

export function WebtoonSection() {
  const searchParams = useSearchParams();
  const channelUrl = useChannelUrlParam();

  const webtoonTabEntries = useMemo(() => objectEntries(WEBTOON_TAB_VALUE_LABEL), []);

  const webtoonParam = useMemo(() => {
    const param = searchParams.get("webtoon");
    if (param && Object.keys(WEBTOON_TAB_VALUE_LABEL).includes(param)) {
      return param as WEBTOON_TAB_VALUE;
    }

    return "POST" as WEBTOON_TAB_VALUE;
  }, [searchParams]);

  return (
    <CardTabCarouselTemplate
      CardCarousel={WT_Post_RichCarousel}
      slots={{
        title: <CardTabCarouselTemplate.Title>웹툰</CardTabCarouselTemplate.Title>,
        tabs: (
          <RadioGroup value={webtoonParam}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {webtoonTabEntries.map(([value, label]) => (
                <RadioButton
                  LinkComponent={NextLink}
                  value={value}
                  key={value}
                  href={`/${channelUrl}/?webtoon=${value}`}
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
            <WT_Post_RichCarousel.PrevNav />
            <WT_Post_RichCarousel.NextNav />
          </>
        ),
        container: <WT_Post_RichCarousel.Container channelUrl={channelUrl} sort="LATEST" />,
      }}
    />
  );
}
