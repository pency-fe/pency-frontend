"use client";

import { createContext, useContext, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Genre, GENRE_LABEL } from "@/shared/config/webtoon/const";

const WtPostGenreContext = createContext<{ genre: Genre | "ALL" } | undefined>(undefined);

export function useWtPostGenre() {
  const context = useContext(WtPostGenreContext);

  return context ?? { genre: undefined };
}

export const WtPostGenreProvider = ({ children }: { children?: React.ReactNode }) => {
  const genreParam = useSearchParams().get("genre");

  const genre = useMemo(() => {
    if (genreParam && Object.keys(GENRE_LABEL).includes(genreParam)) {
      return genreParam as Genre;
    }
    return "ALL" as const;
  }, [genreParam]);

  return <WtPostGenreContext.Provider value={{ genre }}>{children}</WtPostGenreContext.Provider>;
};
