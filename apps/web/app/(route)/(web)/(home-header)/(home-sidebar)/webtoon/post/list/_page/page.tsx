"use client";

import { ComponentProps, useMemo } from "react";
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
import { WT_Post_Filter_Form, WT_Post_RichList } from "_core/webtoon/post";
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
  const filter = useBooleanState(false);

  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  const saveFilter: ComponentProps<typeof WT_Post_Filter_Form.SaveSubmit>["onSubmit"] = (data) => {
    console.log(data);
    filter.setFalse();
  };

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
            <Button
              variant="outlined"
              size="small"
              endIcon={filter.bool ? <EvaArrowIosUpwardFillIcon /> : <EvaArrowIosDownwardFillIcon />}
              onClick={filter.toggle}
            >
              창작유형
            </Button>
            <Button
              variant="outlined"
              size="small"
              endIcon={filter.bool ? <EvaArrowIosUpwardFillIcon /> : <EvaArrowIosDownwardFillIcon />}
              onClick={filter.toggle}
            >
              페어
            </Button>
          </Box>

          <Box ml="auto">
            <Button
              ref={anchorRef}
              variant="outlined"
              size="small"
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
          <WT_Post_Filter_Form>
            <Stack
              spacing={2}
              sx={{ bgcolor: theme.vars.palette.background.paper, borderRadius: 1, px: "20px", py: "12px" }}
            >
              <WT_Post_Filter_Form.CreationTypes />
              <WT_Post_Filter_Form.Pairs />

              <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
                <WT_Post_Filter_Form.Reset onReset={saveFilter} />
                <WT_Post_Filter_Form.SaveSubmit onSubmit={saveFilter} />
              </Box>
            </Stack>
          </WT_Post_Filter_Form>
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
      {paginations.map((pagination, i) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", `${pagination.page}`);
        return (
          <PaginationItem
            key={i}
            component={NextLink}
            href={`/webtoon/post/list${createQueryString(params)}`}
            {...pagination}
          />
        );
      })}
    </>
  );
}
