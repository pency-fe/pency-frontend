"use client";

import NextLink from "next/link";
import { useTheme, Stack, RadioGroup, Box, Button, buttonBaseClasses, MenuItem, PaginationItem } from "@mui/material";
import {
  useMenuxState,
  RadioButton,
  EvaArrowIosUpwardFillIcon,
  EvaArrowIosDownwardFillIcon,
  Menux,
} from "@pency/ui/components";
import { createQueryString, objectEntries } from "@pency/util";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { WT_Post_Channel_RichList } from "_core/webtoon/post";
import { usePaginationx } from "@pency/ui/hooks";
import { useChannelUrlParam } from "_hooks";

// ----------------------------------------------------------------------
// [TODO] getWebtoonPostMe
type contentValue = "POST" | "SERIES";

const CONTENT_VALUE_LABEL: Record<contentValue, string> = {
  POST: "포스트",
  SERIES: "시리즈",
} as const;

type Sort = "LATEST" | "POPULAR";

const SORT_LABEL: Record<Sort, string> = {
  LATEST: "최신순",
  POPULAR: "인기순",
};

// ----------------------------------------------------------------------

export function WebtoonPage() {
  const searchParams = useSearchParams();
  const theme = useTheme();
  const { anchorRef, isOpen, close, toggle } = useMenuxState();
  const channelUrl = useChannelUrlParam();

  const contents = useMemo(() => objectEntries(CONTENT_VALUE_LABEL), []);
  const sorts = useMemo(() => objectEntries(SORT_LABEL), []);

  const contentParam = useMemo(() => {
    const param = searchParams.get("content");
    if (param && Object.keys(CONTENT_VALUE_LABEL).includes(param)) {
      return param as contentValue;
    }

    return "POST" as contentValue;
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
    <Stack spacing={2}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* 라디오 버튼 */}
        <RadioGroup value={contentParam}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {contents.map(([content, label]) => (
              <RadioButton
                value={content}
                key={content}
                LinkComponent={NextLink}
                href={(() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("content", content);
                  return `/${channelUrl}/webtoon${createQueryString(params)}`;
                })()}
                sx={{ flexShrink: 0 }}
              >
                {label}
              </RadioButton>
            ))}
          </Box>
        </RadioGroup>

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
                  href={`/${channelUrl}/webtoon${createQueryString(params)}`}
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
      <WT_Post_Channel_RichList url={channelUrl} sort={sortParam} page={pageParam} />
      <Box sx={{ margin: "auto", mt: 3 }}>
        <Pagination />
      </Box>
    </Stack>
  );
}

function Pagination() {
  const channelUrl = useChannelUrlParam();

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
            href={`/${channelUrl}/webtoon${createQueryString(params)}`}
            {...pagination}
          />
        );
      })}
    </>
  );
}
