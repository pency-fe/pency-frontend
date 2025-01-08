"use client";

import { createContext, useContext } from "react";
import { Genre } from "@/shared/config/webtoon/const";

export const GenresContext = createContext<{ genres: Genre[] | undefined }>({ genres: undefined });

export function useGenres() {
  const context = useContext(GenresContext);

  return context;
}
