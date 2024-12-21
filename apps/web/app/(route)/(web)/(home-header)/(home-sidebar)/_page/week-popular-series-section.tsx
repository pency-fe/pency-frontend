"use client";

import NextLink from "next/link";
import { CardTabCarouselTemplate, RadioButton } from "@pency/ui/components";
import { WT_Post_OverviewCarousel } from "_core/webtoon/post";
import { useMemo } from "react";
import { RadioGroup, Typography } from "@mui/material";
import { createQueryString, objectEntries } from "@pency/util";
import { useSearchParams } from "next/navigation";

// ----------------------------------------------------------------------

type platformValue = "WEBTOON" | "WEBNOVEL";

const PLATFORM_VALUE_LABEL: Record<platformValue, string> = {
  WEBTOON: "웹툰",
  WEBNOVEL: "웹소설",
} as const;

// [TODO] 시리즈 및 웹소설 추가 후, 수정
// ----------------------------------------------------------------------

export function WPopularSeriesSection() {
  const searchParams = useSearchParams();

  const platform = useMemo(() => objectEntries(PLATFORM_VALUE_LABEL), []);
  const platformParam = useMemo(() => {
    const param = searchParams.get("wpopular-series");
    if (param && Object.keys(PLATFORM_VALUE_LABEL).includes(param)) {
      return param as platformValue;
    }

    return "WEBTOON" as platformValue;
  }, [searchParams]);

  /**
   * 목표: 시리즈 랭킹(웹툰/웹소설)
   * rank="WEBTOON" | "WEBNOVEL"
   *
   * 목표: 주간 인기 시리즈(웹툰/웹소설)
   * wpopular-series="WEBTOON" | "WEBNOVEL"
   *
   * 목표: 주간 인기 포스트(웹툰/웹소설)
   * wpopular-post="WEBTOON" | "WEBNOVEL"
   *
   */
  return (
    <>
      {platformParam === "WEBTOON" ? (
        <CardTabCarouselTemplate
          CardCarousel={WT_Post_OverviewCarousel}
          slots={{
            title: <CardTabCarouselTemplate.Title>주간 인기 시리즈</CardTabCarouselTemplate.Title>,
            tabs: (
              <CardTabCarouselTemplate.Tabs>
                <RadioGroup value={platformParam} sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {platform.map(([platform, label]) => (
                    <RadioButton
                      LinkComponent={NextLink}
                      value={platform}
                      key={platform}
                      href={(() => {
                        const params = new URLSearchParams(searchParams.toString());
                        if (platform === "WEBNOVEL") {
                          params.set("wpopular-series", platform);
                        } else {
                          params.delete("wpopular-series");
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
            moreButton: <CardTabCarouselTemplate.MoreButton component={NextLink} href={`/[TODO]주간_인기_시리즈`} />,
            prevNextNav: (
              <>
                <WT_Post_OverviewCarousel.PrevNav />
                <WT_Post_OverviewCarousel.NextNav />
              </>
            ),
            container: <WT_Post_OverviewCarousel.Container genre="ALL" sort="WPOPULAR" />,
          }}
        />
      ) : (
        <Typography>웹소설</Typography>
      )}
    </>
  );
}
