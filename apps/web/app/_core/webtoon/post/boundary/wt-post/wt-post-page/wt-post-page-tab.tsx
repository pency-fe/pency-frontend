"use client";

import { createContext, useContext, useMemo } from "react";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { RadioGroup } from "@mui/material";
import { RadioButton } from "@pency/ui/components";
import { hideScrollX } from "@pency/ui/util";
import { createQueryString, objectEntries } from "@pency/util";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";

// ----------------------------------------------------------------------

const TabDataContext = createContext<{ genre: Genre | "ALL" } | undefined>(undefined);

export function useTabData() {
  const context = useContext(TabDataContext);

  if (!context) throw new Error(`<부모로 <TabProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
}

const TabProvider = ({ children }: { children?: React.ReactNode }) => {
  const genreParam = useSearchParams().get("genre");

  const genre = useMemo(() => {
    if (genreParam && Object.keys(GENRE_LABEL).includes(genreParam)) {
      return genreParam as Genre;
    }
    return "ALL" as const;
  }, [genreParam]);

  return <TabDataContext.Provider value={{ genre }}>{children}</TabDataContext.Provider>;
};

// ----------------------------------------------------------------------

const GenreTabFn = () => {
  const { genre } = useTabData();
  const searchParams = useSearchParams();

  const genres = useMemo(() => objectEntries(GENRE_LABEL), []);

  return (
    <RadioGroup
      value={genre}
      sx={{ flexDirection: "row", flexWrap: "nowrap", gap: 1, overflowX: "scroll", ...hideScrollX }}
    >
      <RadioButton
        LinkComponent={NextLink}
        value="ALL"
        href={(() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("genre");
          params.delete("page");
          return `/webtoon/post/list${createQueryString(params)}`;
        })()}
        sx={{ flexShrink: 0 }}
      >
        전체
      </RadioButton>
      {genres.map(([genre, label]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("genre", genre);
        params.delete("page");
        return (
          <RadioButton
            key={genre}
            LinkComponent={NextLink}
            value={genre}
            href={`/webtoon/post/list${createQueryString(params)}`}
            sx={{ flexShrink: 0 }}
          >
            {label}
          </RadioButton>
        );
      })}
    </RadioGroup>
  );
};

export const WT_Post_PageTab = Object.assign(TabProvider, {
  GenreTab: GenreTabFn,
});
