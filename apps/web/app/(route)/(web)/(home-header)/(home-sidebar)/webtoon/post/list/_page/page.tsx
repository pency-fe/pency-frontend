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
  Collapse,
} from "@mui/material";
import {
  EvaArrowIosDownwardFillIcon,
  EvaArrowIosUpwardFillIcon,
  Menux,
  RadioButton,
  useMenuxState,
} from "@pency/ui/components";
import { hideScrollX } from "@pency/ui/util";
import { createQueryString, objectEntries, useBooleanState } from "@pency/util";
import { Genre, GENRE_LABEL } from "_core/webtoon/const";
import { WT_Post_RichList } from "_core/webtoon/post";
import { useSearchParams } from "next/navigation";
import { usePaginationx } from "@pency/ui/hooks";
import { CREATION_TYPE_LABEL, PAIR_LABEL } from "_core/webtoon/post/const";

type Sort = "LATEST" | "POPULAR" | "WPOPULAR";

const SORT_LABEL: Record<Sort, string> = {
  LATEST: "최신순",
  POPULAR: "전체 인기순",
  WPOPULAR: "주간 인기순",
};

export function ListPage() {
  const searchParams = useSearchParams();
  const theme = useTheme();
  const filter = useBooleanState(false);

  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  const saveFilter = () => {
    filter.setFalse();
  };

  const genres = useMemo(() => objectEntries(GENRE_LABEL), []);
  const sorts = useMemo(() => objectEntries(SORT_LABEL), []);
  const creationTypes = useMemo(() => objectEntries(CREATION_TYPE_LABEL), []);
  const pairs = useMemo(() => objectEntries(PAIR_LABEL), []);

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
      <Stack spacing={2}>
        <Typography variant="h4">웹툰 포스트</Typography>

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

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" endIcon={<EvaArrowIosDownwardFillIcon />} onClick={filter.toggle}>
              창작유형
            </Button>
            <Button variant="outlined" endIcon={<EvaArrowIosDownwardFillIcon />} onClick={filter.toggle}>
              페어
            </Button>
          </Box>

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

        <Collapse in={filter.bool}>
          <Stack
            spacing={2}
            sx={{ bgcolor: theme.vars.palette.background.paper, borderRadius: 1, px: "20px", py: "12px" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ width: 100, flexShrink: 0 }}>창작유형</Typography>
              <RadioGroup
                sx={{ flexDirection: "row", flexWrap: "nowrap", gap: 1, overflowX: "scroll", ...hideScrollX }}
              >
                <RadioButton value="ALL" sx={{ flexShrink: 0 }} size="small">
                  전체
                </RadioButton>
                {creationTypes.map(([creationType, label]) => {
                  return (
                    <RadioButton key={creationType} value={creationType} size="small" sx={{ flexShrink: 0 }}>
                      {label}
                    </RadioButton>
                  );
                })}
              </RadioGroup>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ width: 100, flexShrink: 0 }}>페어</Typography>
              <RadioGroup
                sx={{ flexDirection: "row", flexWrap: "nowrap", gap: 1, overflowX: "scroll", ...hideScrollX }}
              >
                <RadioButton value="ALL" size="small" sx={{ flexShrink: 0 }}>
                  전체
                </RadioButton>
                {pairs.map(([pair, label]) => {
                  return (
                    <RadioButton key={pair} value={pair} size="small" sx={{ flexShrink: 0 }}>
                      {label}
                    </RadioButton>
                  );
                })}
              </RadioGroup>
            </Box>
            <Button variant="contained" size="small" sx={{ ml: "auto" }} onClick={saveFilter}>
              저장
            </Button>
          </Stack>
        </Collapse>

        <WT_Post_RichList genre={genreParam} sort={sortParam} page={pageParam} />
        <Box sx={{ margin: "auto", mt: 3 }}>
          <Pagination />
        </Box>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Pagination() {
  const searchParams = useSearchParams();
  const pageParam = useMemo(() => {
    const param = Number(searchParams.get("page"));
    if (param && !isNaN(param) && param >= 1) {
      return param;
    }
    return 1;
  }, [searchParams]);

  const paginations = usePaginationx({ pageCount: 20, currentPage: pageParam });

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
