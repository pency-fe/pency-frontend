"use client";

import { useMemo } from "react";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { RadioGroup } from "@mui/material";
import { CardTabCarouselTemplate, RadioButton } from "@pency/ui/components";
import { createQueryString, objectEntries } from "@pency/util";
import { WtEpisodeOverviewCardCarousel } from "@/features/wt-episode";

// ----------------------------------------------------------------------

type PlatformValue = "WEBTOON" | "WEBNOVEL";

const PLATFORM_VALUE_LABEL: Record<PlatformValue, string> = {
  WEBTOON: "웹툰",
  WEBNOVEL: "웹소설",
} as const;

// ----------------------------------------------------------------------

export function WPopularSeriesSection() {
  const searchParams = useSearchParams();

  const platform = useMemo(() => {
    const param = searchParams.get("wpopular-series");
    if (param && Object.keys(PLATFORM_VALUE_LABEL).includes(param)) {
      return param as PlatformValue;
    }

    return "WEBTOON" as PlatformValue;
  }, [searchParams.get("wpopular-series")]);

  const platformEntries = useMemo(() => objectEntries(PLATFORM_VALUE_LABEL), []);

  // [TODO] 웹소설 추가후 수정
  const OverviewCardCarousel = useMemo(
    () => (platform === "WEBTOON" ? WtEpisodeOverviewCardCarousel : WtEpisodeOverviewCardCarousel),
    [platform],
  );

  return (
    <CardTabCarouselTemplate
      CardCarousel={OverviewCardCarousel}
      slots={{
        title: <CardTabCarouselTemplate.Title>주간 인기 시리즈</CardTabCarouselTemplate.Title>,
        tabs: (
          <CardTabCarouselTemplate.Tabs>
            <RadioGroup value={platform} sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 0.5 }}>
              {platformEntries.map(([value, label]) => (
                <RadioButton
                  key={value}
                  component={NextLink}
                  value={value}
                  href={(() => {
                    const params = new URLSearchParams(searchParams.toString());
                    if (value === "WEBNOVEL") {
                      params.set("wpopular-series", value);
                    } else {
                      params.delete("wpopular-series");
                    }
                    return `/${createQueryString(params)}`;
                  })()}
                  scroll={false}
                  sx={{ flexShrink: 0 }}
                >
                  {label}
                </RadioButton>
              ))}
            </RadioGroup>
          </CardTabCarouselTemplate.Tabs>
        ),
        moreButton: (
          <CardTabCarouselTemplate.MoreButton
            component={NextLink}
            href={`/${platform.toLowerCase()}/series/list?sort=WPOPULAR`}
          />
        ),
        prevNextNav: (
          <>
            <OverviewCardCarousel.PrevNav />
            <OverviewCardCarousel.NextNav />
          </>
        ),
      }}
    >
      <OverviewCardCarousel.Panel genre="ALL" sort="WPOPULAR" />
    </CardTabCarouselTemplate>
  );
}
