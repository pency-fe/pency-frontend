"use client";

import NextLink from "next/link";
import { RadioGroup, Box, Grid } from "@mui/material";
import { RadioButton } from "@pency/ui/components";
import { createQueryString, objectEntries } from "@pency/util";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { WT_Post_PageContent, WT_Post_PageOrder } from "_core/webtoon/post";
import { useChannelUrlParam } from "_hooks";

// ----------------------------------------------------------------------

type contentValue = "POST" | "SERIES";

const CONTENT_VALUE_LABEL: Record<contentValue, string> = {
  POST: "포스트",
  SERIES: "시리즈",
} as const;

// ----------------------------------------------------------------------

export function WebtoonPage() {
  const searchParams = useSearchParams();
  const channelUrl = useChannelUrlParam();
  const contentTabEntries = useMemo(() => objectEntries(CONTENT_VALUE_LABEL), []);

  const contentParam = useMemo(() => {
    const param = searchParams.get("content");
    if (param && Object.keys(CONTENT_VALUE_LABEL).includes(param)) {
      return param as contentValue;
    }

    return "POST" as contentValue;
  }, [searchParams]);

  return (
    <Grid container gap={2}>
      <Grid item xs="auto">
        <RadioGroup value={contentParam}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {contentTabEntries.map(([value, label]) => (
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

      {contentParam === "POST" ? (
        <WT_Post_PageOrder
          sortLabel={{
            LATEST: "최신순",
            POPULAR: "인기순",
          }}
        >
          <Grid item xs sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <WT_Post_PageOrder.Order />
          </Grid>
          <Grid item xs={12}>
            <WT_Post_PageContent channelUrl={channelUrl}>
              <WT_Post_PageContent.Page />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <WT_Post_PageContent.Pagination />
              </Box>
            </WT_Post_PageContent>
          </Grid>
        </WT_Post_PageOrder>
      ) : null}

      {contentParam === "SERIES" ? "TODO" : null}
    </Grid>
  );
}
