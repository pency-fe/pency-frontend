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
  FilterChip,
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
import { useSessionStorage } from "usehooks-ts";
import { CREATION_TYPE_LABEL, CreationType, Pair, PAIR_LABEL } from "_core/webtoon/post/const";

type Sort = "LATEST" | "POPULAR" | "WPOPULAR";

const SORT_LABEL: Record<Sort, string> = {
  LATEST: "최신순",
  POPULAR: "전체 인기순",
  WPOPULAR: "주간 인기순",
};

export function ListPage() {
  const searchParams = useSearchParams();
  const [creationTypes, setCreationTypes] = useSessionStorage<CreationType[]>("wt-post-filter-creation-type", []);
  const [pairs, setPairs] = useSessionStorage<Pair[]>("wt-post-filter-pair", []);

  const filter = useBooleanState(false);
  const theme = useTheme();

  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  const saveFilter: ComponentProps<typeof WT_Post_Filter_Form.SaveSubmit>["onSubmit"] = (data) => {
    setCreationTypes(data.creationTypes);
    setPairs(data.pairs);
    filter.setFalse();
  };

  const resetFilter: ComponentProps<typeof WT_Post_Filter_Form.Reset>["onReset"] = (data) => {
    setCreationTypes(data.creationTypes);
    setPairs(data.pairs);
    filter.setFalse();
  };

  const genres = useMemo(() => objectEntries(GENRE_LABEL), []);
  const sorts = useMemo(() => objectEntries(SORT_LABEL), []);

  const creationTypesLabel = useMemo(() => {
    let label = "창작유형";
    if (creationTypes.length === 1) {
      label = CREATION_TYPE_LABEL[creationTypes[0]!];
    } else if (creationTypes.length > 1) {
      label = `${CREATION_TYPE_LABEL[creationTypes[0]!]} 외 ${creationTypes.length - 1}`;
    }

    return label;
  }, [creationTypes]);

  const pairsLabel = useMemo(() => {
    let label = "페어";
    if (pairs.length === 1) {
      label = PAIR_LABEL[pairs[0]!];
    } else if (pairs.length > 1) {
      label = `${PAIR_LABEL[pairs[0]!]} 외 ${pairs.length - 1}`;
    }

    return label;
  }, [pairs]);

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

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            ref={anchorRef}
            variant="outlined"
            onClick={toggle}
            endIcon={isOpen ? <EvaArrowIosUpwardFillIcon /> : <EvaArrowIosDownwardFillIcon />}
            sx={{
              [`&.${buttonBaseClasses.root}`]: { color: theme.vars.palette.text.secondary },
              flexShrink: 0,
            }}
          >
            {SORT_LABEL[sortParam]}
          </Button>
          <Menux
            open={isOpen}
            anchorEl={anchorRef.current}
            placement="bottom-start"
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
              gap: 1,
              overflowX: "scroll",
              ...hideScrollX,
            }}
          >
            <FilterChip
              label={creationTypesLabel}
              open={filter.bool}
              active={!!creationTypes.length}
              onClick={filter.toggle}
            />
            <FilterChip label={pairsLabel} open={filter.bool} active={!!pairs.length} onClick={filter.toggle} />
          </Box>
        </Box>

        <Collapse in={filter.bool}>
          <WT_Post_Filter_Form
            defaultValue={{
              creationTypes,
              pairs,
            }}
          >
            <Stack
              spacing={2}
              sx={{ bgcolor: theme.vars.palette.background.paper, borderRadius: 1, px: "20px", py: "12px" }}
            >
              <WT_Post_Filter_Form.CreationTypes />
              <WT_Post_Filter_Form.Pairs />

              <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
                <WT_Post_Filter_Form.Reset onReset={resetFilter} />
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
