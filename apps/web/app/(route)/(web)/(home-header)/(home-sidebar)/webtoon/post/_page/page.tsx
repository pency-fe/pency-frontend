"use client";

import { Box, RadioGroup, Stack } from "@mui/material";
import { RadioButton } from "@pency/ui/components";
import { useMemo } from "react";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { objectEntries } from "@pency/util";
import { hideScrollX } from "@pency/ui/util";
import { useRouter, useSearchParams } from "next/navigation";
import { BannerSection } from "./banner-section";
import { RankSection } from "./rank-section";
import { LatestSection } from "./latest-section";
import { PopularSection } from "./popular-section";
import { WeekPopularSection } from "./week-popular-section";

export default function PostPage() {
  return (
    <Stack spacing={5}>
      <Stack spacing={1.5}>
        <RadioTabButton />
        <BannerSection />
      </Stack>
      <RankSection />
      <LatestSection />
      <PopularSection />
      <WeekPopularSection />
    </Stack>
  );
}

function RadioTabButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const genres = useMemo(() => objectEntries(GENRE_LABEL), []);
  const genre = useMemo(() => {
    const param = searchParams.get("genre");
    if (param && Object.keys(GENRE_LABEL).includes(param)) {
      return param as Genre;
    }

    return "ALL" as const;
  }, [searchParams]);

  return (
    <RadioGroup
      value={genre}
      onChange={(e) => {
        router.push(`/webtoon/post?genre=${e.target.value}`);
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 1, width: 1, overflowX: "scroll", ...hideScrollX }}>
        <RadioButton value="ALL">전체</RadioButton>
        {genres.map(([genre, label]) => (
          <RadioButton value={genre}> {label}</RadioButton>
        ))}
      </Box>
    </RadioGroup>
  );
}
