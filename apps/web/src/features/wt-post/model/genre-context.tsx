"use client";

import { createContext, useContext } from "react";
import { Genre } from "@/shared/config/webtoon/const";

export const GenreContext = createContext<{ genre: Genre | "ALL" | undefined }>({ genre: undefined });

export function useGenre() {
  const context = useContext(GenreContext);

  return context;
}
