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

type CONTENT_VALUE = "POST" | "SERIES";

const CONTENT_VALUE_LABEL: Record<CONTENT_VALUE, string> = {
  POST: "포스트",
  SERIES: "시리즈",
} as const;

// ----------------------------------------------------------------------

export function WebtoonSection() {
  const searchParams = useSearchParams();
  const channelUrl = useChannelUrlParam();

  const contentEntries = useMemo(() => objectEntries(CONTENT_VALUE_LABEL), []);

  const content = useMemo(() => {
    const param = searchParams.get("webtoon");
    if (param && Object.keys(CONTENT_VALUE_LABEL).includes(param)) {
      return param as CONTENT_VALUE;
    }

    return "POST" as CONTENT_VALUE;
  }, [searchParams]);

  return (
    <CardTabCarouselTemplate
      CardCarousel={WtPostRichCardCarousel}
      slots={{
        title: <CardTabCarouselTemplate.Title>웹툰</CardTabCarouselTemplate.Title>,
        tabs: (
          <RadioGroup value={content}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {contentEntries.map(([value, label]) => (
                <RadioButton
                  component={NextLink}
                  value={value}
                  key={value}
                  href={`/${channelUrl}/?webtoon=${value}`}
                  scroll={false}
                  sx={{ flexShrink: 0 }}
                >
                  {label}
                </RadioButton>
              ))}
            </Box>
          </RadioGroup>
        ),
        moreButton: (
          <CardTabCarouselTemplate.MoreButton component={NextLink} href={`/${channelUrl}/webtoon?content=${content}`} />
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
