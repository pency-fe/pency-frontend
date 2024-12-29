"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Genre, GENRE_LABEL } from "@/shared/config/webtoon/const";

export function useGenreParam() {
  const genreParam = useSearchParams().get("genre");

  const genre = useMemo(() => {
    if (genreParam && Object.keys(GENRE_LABEL).includes(genreParam)) {
      return genreParam as Genre;
    }
    return "ALL" as const;
  }, [genreParam]);

  return genre;
}
