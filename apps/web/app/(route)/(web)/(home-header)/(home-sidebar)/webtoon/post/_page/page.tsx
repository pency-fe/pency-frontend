"use client";

import { useMemo } from "react";
import NextLink from "next/link";
import { RadioGroup, Stack } from "@mui/material";
import { RadioButton } from "@pency/ui/components";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { objectEntries } from "@pency/util";
import { hideScrollX } from "@pency/ui/util";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();

  const genres = useMemo(() => objectEntries(GENRE_LABEL), []);

  const genreParam = useMemo(() => {
    const param = searchParams.get("genre");
    if (param && Object.keys(GENRE_LABEL).includes(param)) {
      return param as Genre;
    }

    return "ALL" as const;
  }, [searchParams]);

  return (
    <RadioGroup
      value={genreParam}
      sx={{ flexDirection: "row", flexWrap: "nowrap", gap: 1, overflowX: "scroll", ...hideScrollX }}
    >
      <RadioButton value="ALL" key="ALL" LinkComponent={NextLink} href="/webtoon/post" sx={{ flexShrink: 0 }}>
        전체
      </RadioButton>
      {genres.map(([genre, label]) => (
        <RadioButton
          value={genre}
          key={genre}
          LinkComponent={NextLink}
          href={`/webtoon/post?genre=${genre}`}
          sx={{ flexShrink: 0 }}
        >
          {label}
        </RadioButton>
      ))}
    </RadioGroup>
  );
}
