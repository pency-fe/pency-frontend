"use client";

import { useMemo } from "react";
import NextLink from "next/link";
import { RadioGroup, Stack } from "@mui/material";
import { RadioButton } from "@pency/ui/components";
import { hideScrollX } from "@pency/ui/util";
import { objectEntries } from "@pency/util";
import { GENRE_LABEL } from "@/shared/config/webtoon/const";
import { useGenreParam } from "../../model/wt-post-home/use-genre-param";
import { BannerSection } from "./banner-section";
import { RankSection } from "./rank-section";
import { LatestSection } from "./latest-section";
import { PopularSection } from "./popular-section";
import { WeekPopularSection } from "./week-popular-section";

export function WtPostHomePage() {
  return (
    <Stack spacing={5}>
      <Stack spacing={1.5}>
        <GenreTabs />
        <BannerSection />
      </Stack>
      <RankSection />
      <LatestSection />
      <PopularSection />
      <WeekPopularSection />
    </Stack>
  );
}

function GenreTabs() {
  const genre = useGenreParam();
  const genreEntries = useMemo(() => objectEntries(GENRE_LABEL), []);

  return (
    <RadioGroup
      value={genre}
      sx={{ flexDirection: "row", flexWrap: "nowrap", gap: 1, overflowX: "scroll", ...hideScrollX }}
    >
      <RadioButton value="ALL" key="ALL" LinkComponent={NextLink} href="/webtoon/post" sx={{ flexShrink: 0 }}>
        전체
      </RadioButton>
      {genreEntries.map(([value, label]) => (
        <RadioButton
          value={value}
          key={value}
          LinkComponent={NextLink}
          href={`/webtoon/post?genre=${value}`}
          sx={{ flexShrink: 0 }}
        >
          {label}
        </RadioButton>
      ))}
    </RadioGroup>
  );
}
