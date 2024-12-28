"use client";

import { useMemo } from "react";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { RadioGroup } from "@mui/material";
import { CardTabCarouselTemplate, RadioButton } from "@pency/ui/components";
import { createQueryString, objectEntries } from "@pency/util";
import { WT_Post_OverviewCarousel } from "@/features/wt-post";

// ----------------------------------------------------------------------

type PlatformValue = "WEBTOON" | "WEBNOVEL";

const PLATFORM_VALUE_LABEL: Record<PlatformValue, string> = {
  WEBTOON: "웹툰",
  WEBNOVEL: "웹소설",
} as const;

// ----------------------------------------------------------------------

export function WPopularPostSection() {
  const searchParams = useSearchParams();

  const platform = useMemo(() => {
    const param = useSearchParams().get("wpopular-post");
    if (param && Object.keys(PLATFORM_VALUE_LABEL).includes(param)) {
      return param as PlatformValue;
    }

    return "WEBTOON" as PlatformValue;
  }, [searchParams]);

  const platformEntries = useMemo(() => objectEntries(PLATFORM_VALUE_LABEL), []);

  // [TODO] 웹소설 추가후 수정
  const OverviewCarousel = useMemo(
    () => (platform === "WEBTOON" ? WT_Post_OverviewCarousel : WT_Post_OverviewCarousel),
    [platform],
  );

  return (
    <CardTabCarouselTemplate
      CardCarousel={OverviewCarousel}
      slots={{
        title: <CardTabCarouselTemplate.Title>주간 인기 포스트</CardTabCarouselTemplate.Title>,
        tabs: (
          <CardTabCarouselTemplate.Tabs>
            <RadioGroup value={platform} sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 0.5 }}>
              {platformEntries.map(([value, label]) => (
                <RadioButton
                  LinkComponent={NextLink}
                  value={value}
                  key={value}
                  href={(() => {
                    const params = new URLSearchParams(searchParams.toString());
                    if (value === "WEBNOVEL") {
                      params.set("wpopular-post", value);
                    } else {
                      params.delete("wpopular-post");
                    }
                    return `${createQueryString(params)}`;
                  })()}
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
            href={`/${platform.toLowerCase()}/post/list?sort=WPOPULAR`}
          />
        ),
        prevNextNav: (
          <>
            <OverviewCarousel.PrevNav />
            <OverviewCarousel.NextNav />
          </>
        ),
        container: <OverviewCarousel.Container genre="ALL" sort="WPOPULAR" />,
      }}
    />
  );
}
