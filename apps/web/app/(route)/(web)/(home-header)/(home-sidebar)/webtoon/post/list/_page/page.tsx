"use client";

import { useMemo } from "react";
import NextLink from "next/link";
import {
  Stack,
  Box,
  Typography,
  MenuItem,
  RadioGroup,
  Button,
  useTheme,
  buttonBaseClasses,
  PaginationItem,
} from "@mui/material";
import {
  EvaArrowIosDownwardFillIcon,
  EvaArrowIosUpwardFillIcon,
  Menux,
  RadioButton,
  useMenuxState,
} from "@pency/ui/components";
import { hideScrollX } from "@pency/ui/util";
import { createQueryString, objectEntries } from "@pency/util";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { WT_Post_RichList } from "_core/webtoon/post";
import { useSearchParams } from "next/navigation";
import { usePaginationx } from "@pency/ui/hooks";

type Sort = "LATEST" | "POPULAR" | "WPOPULAR";

const SORT_LABEL: Record<Sort, string> = {
  LATEST: "최신순",
  POPULAR: "전체 인기순",
  WPOPULAR: "주간 인기순",
};

export function ListPage() {
  const searchParams = useSearchParams();
  const theme = useTheme();
  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  const genres = useMemo(() => objectEntries(GENRE_LABEL), []);
  const sorts = useMemo(() => objectEntries(SORT_LABEL), []);

  const genreParam = useMemo(() => {
    const param = searchParams.get("genre");
    if (param && Object.keys(GENRE_LABEL).includes(param)) {
      return param as Genre;
    }
    return "ALL" as const;
  }, [searchParams]);

  const sortParam = useMemo(() => {
    const param = searchParams.get("sort");
    if (param && Object.keys(SORT_LABEL).includes(param)) {
      return param as Sort;
    }
    return "LATEST" as Sort;
  }, [searchParams]);

  const pageParam = useMemo(() => {
    const param = Number(searchParams.get("page"));
    if (param && !isNaN(param) && param >= 1) {
      return param;
    }
    return 1;
  }, [searchParams]);

  return (
    <Stack spacing={3}>
      <RadioGroup
        value={genreParam}
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

      <Stack spacing={2}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4">웹툰 포스트</Typography>

          <Box ml="auto">
            <Button
              ref={anchorRef}
              variant="outlined"
              onClick={toggle}
              endIcon={isOpen ? <EvaArrowIosUpwardFillIcon /> : <EvaArrowIosDownwardFillIcon />}
              sx={{
                [`&.${buttonBaseClasses.root}`]: { color: theme.vars.palette.text.secondary },
              }}
            >
              {SORT_LABEL[sortParam]}
            </Button>
            <Menux
              open={isOpen}
              anchorEl={anchorRef.current}
              placement="bottom-end"
              onClose={close}
              modifiers={[
                {
                  name: "offset",
                  options: {
                    offset: [0, 6],
                  },
                },
              ]}
              sx={{ width: "150px" }}
            >
              {sorts.map(([sort, label]) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("sort", sort);
                return (
                  <MenuItem
                    key={sort}
                    component={NextLink}
                    href={`/webtoon/post/list${createQueryString(params)}`}
                    selected={sortParam === sort}
                    onClick={close}
                  >
                    {label}
                  </MenuItem>
                );
              })}
            </Menux>
          </Box>
        </Box>
        <WT_Post_RichList genre={genreParam} sort={sortParam} page={pageParam} />
        <Box sx={{ margin: "auto", mt: 3 }}>
          <Pagination />
        </Box>
      </Stack>
    </Stack>
  );
}

function Pagination() {
  const searchParams = useSearchParams();
  const pageParam = useMemo(() => {
    const param = Number(searchParams.get("page"));
    if (param && !isNaN(param) && param >= 1) {
      return param;
    }
    return 1;
  }, [searchParams]);

  const paginations = usePaginationx({ totalCount: 20, currentPage: pageParam });

  return (
    <>
      {paginations.map((pagination) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", `${pagination.page}`);
        return (
          <PaginationItem
            component={NextLink}
            href={`/webtoon/post/list${createQueryString(params)}`}
            {...pagination}
          />
        );
      })}
    </>
  );
}
