"use client";

import NextLink from "next/link";
import { Box, RadioGroup } from "@mui/material";
import { CardTabCarouselTemplate, RadioButton } from "@pency/ui/components";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { objectEntries } from "@pency/util";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";
import { WtPostRichCardCarousel } from "@/features/wt-post";

// ----------------------------------------------------------------------

type WEBTOON_VALUE = "POST" | "SERIES";

const WEBTOON_VALUE_LABEL: Record<WEBTOON_VALUE, string> = {
  POST: "포스트",
  SERIES: "시리즈",
} as const;

// ----------------------------------------------------------------------

export function WebtoonSection() {
  const searchParams = useSearchParams();
  const channelUrl = useChannelUrlParam();

  const webtoonTabEntries = useMemo(() => objectEntries(WEBTOON_VALUE_LABEL), []);

  const webtoon = useMemo(() => {
    const param = searchParams.get("webtoon");
    if (param && Object.keys(WEBTOON_VALUE_LABEL).includes(param)) {
      return param as WEBTOON_VALUE;
    }

    return "POST" as WEBTOON_VALUE;
  }, [searchParams]);

  return (
    <CardTabCarouselTemplate
      CardCarousel={WtPostRichCardCarousel}
      slots={{
        title: <CardTabCarouselTemplate.Title>웹툰</CardTabCarouselTemplate.Title>,
        tabs: (
          <RadioGroup value={webtoon}>
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
          <CardTabCarouselTemplate.MoreButton component={NextLink} href={`/${channelUrl}/webtoon?webtoon=${webtoon}`} />
        ),
        prevNextNav: (
          <>
            <WtPostRichCardCarousel.PrevNav />
            <WtPostRichCardCarousel.NextNav />
          </>
        ),
      }}
    >
      <WtPostRichCardCarousel.Panel channelUrl={channelUrl} sort="LATEST" />
    </CardTabCarouselTemplate>
  );
}
