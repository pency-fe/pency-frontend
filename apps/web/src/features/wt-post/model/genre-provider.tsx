"use client";

import { createContext, useContext, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Genre, GENRE_LABEL } from "@/shared/config/webtoon/const";

const GenreContext = createContext<{ genre: Genre | "ALL" } | undefined>(undefined);

export function useGenre() {
  const context = useContext(GenreContext);

  return context ?? { genre: undefined };
}

export const GenreProvider = ({ children }: { children?: React.ReactNode }) => {
  const genreParam = useSearchParams().get("genre");

  const genre = useMemo(() => {
    if (genreParam && Object.keys(GENRE_LABEL).includes(genreParam)) {
      return genreParam as Genre;
    }
    return "ALL" as const;
  }, [genreParam]);

  return <GenreContext.Provider value={{ genre }}>{children}</GenreContext.Provider>;
};
