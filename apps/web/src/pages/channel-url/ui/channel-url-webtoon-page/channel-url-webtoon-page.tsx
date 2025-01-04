"use client";

import NextLink from "next/link";
import { RadioGroup, Box, Grid } from "@mui/material";
import { RadioButton } from "@pency/ui/components";
import { createQueryString, objectEntries } from "@pency/util";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";
import { WtPostGallery, WtPostGallerySort, WtPostMenu } from "@/features/wt-post";

// ----------------------------------------------------------------------

type ContentValue = "POST" | "SERIES";

const CONTENT_VALUE_LABEL: Record<ContentValue, string> = {
  POST: "포스트",
  SERIES: "시리즈",
} as const;

// ----------------------------------------------------------------------

export function ChannelUrlWebtoonPage() {
  const searchParams = useSearchParams();
  const channelUrl = useChannelUrlParam();

  const contentEntries = useMemo(() => objectEntries(CONTENT_VALUE_LABEL), []);

  const content = useMemo(() => {
    const param = searchParams.get("content");
    if (param && Object.keys(CONTENT_VALUE_LABEL).includes(param)) {
      return param as ContentValue;
    }

    return "POST" as ContentValue;
  }, [searchParams]);

  return (
    <Grid container gap={2}>
      <Grid item xs="auto">
        <RadioGroup value={content}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {contentEntries.map(([value, label]) => (
              <RadioButton
                value={value}
                key={value}
                LinkComponent={NextLink}
                href={(() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("content", value);
                  return `/${channelUrl}/webtoon${createQueryString(params)}`;
                })()}
                sx={{ flexShrink: 0 }}
              >
                {label}
              </RadioButton>
            ))}
          </Box>
        </RadioGroup>
      </Grid>

      {content === "POST" ? (
        <WtPostGallerySort
          sortLabel={{
            LATEST: "최신순",
            POPULAR: "인기순",
          }}
        >
          <Grid item xs sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <WtPostGallerySort.FilterChip />
          </Grid>
          <Grid item xs={12}>
            <WtPostGallery channelUrl={channelUrl}>
              <WtPostGallery.Panel Menu={WtPostMenu} />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <WtPostGallery.Pagination />
              </Box>
            </WtPostGallery>
          </Grid>
        </WtPostGallerySort>
      ) : null}

      {content === "SERIES" ? "TODO" : null}
    </Grid>
  );
}
