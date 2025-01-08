"use client";

import { ComponentProps, useMemo } from "react";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { RadioGroup } from "@mui/material";
import { RadioButton } from "@pency/ui/components";
import { hideScrollX } from "@pency/ui/util";
import { arrayIncludes, createQueryString, objectEntries, objectKeys } from "@pency/util";
import { GENRE_LABEL } from "@/shared/config/webtoon/const";
import { GenresContext, useGenres } from "../../model/genres-context";

// ----------------------------------------------------------------------

const GenreProvider = ({ children }: { children?: React.ReactNode }) => {
  const genreParam = useSearchParams().get("genre");

  const genre = useMemo(() => {
    if (genreParam && arrayIncludes(objectKeys(GENRE_LABEL), genreParam)) {
      return genreParam;
    }
    return undefined;
  }, [genreParam]);

  return <GenresContext.Provider value={{ genres: genre ? [genre] : [] }}>{children}</GenresContext.Provider>;
};

// ----------------------------------------------------------------------

const WtSeriesGalleryGenreFn = (rest: ComponentProps<typeof GenreProvider>) => {
  return <GenreProvider {...rest} />;
};

// ----------------------------------------------------------------------

const RadioButtonsFn = () => {
  const { genres } = useGenres();
  if (!genres) {
    throw new Error(`<부모로 <WtSeriesGalleryGenre /> 컴포넌트가 있어야 합니다.`);
  }

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const genreEntries = useMemo(() => objectEntries(GENRE_LABEL), []);

  return (
    <RadioGroup
      value={genres[0]}
      sx={{ flexDirection: "row", flexWrap: "nowrap", gap: 1, overflowX: "scroll", ...hideScrollX }}
    >
      <RadioButton
        LinkComponent={NextLink}
        value="ALL"
        href={(() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("genre");
          params.delete("page");
          return `${pathname}${createQueryString(params)}`;
        })()}
        sx={{ flexShrink: 0 }}
      >
        전체
      </RadioButton>
      {genreEntries.map(([value, label]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("genre", value);
        params.delete("page");
        return (
          <RadioButton
            key={value}
            LinkComponent={NextLink}
            value={value}
            href={`${pathname}${createQueryString(params)}`}
            sx={{ flexShrink: 0 }}
          >
            {label}
          </RadioButton>
        );
      })}
    </RadioGroup>
  );
};

// ----------------------------------------------------------------------

export const WtSeriesGalleryGenre = Object.assign(WtSeriesGalleryGenreFn, {
  RadioButtons: RadioButtonsFn,
});
