"use client";

import NextLink from "next/link";
import { useTheme, Stack, RadioGroup, Box, Button, buttonBaseClasses, MenuItem, Pagination } from "@mui/material";
import {
  useMenuxState,
  RadioButton,
  EvaArrowIosUpwardFillIcon,
  EvaArrowIosDownwardFillIcon,
  Menux,
} from "@pency/ui/components";
import { objectEntries, createQueryString } from "@pency/util";
import { useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { WT_Post_Channel_RichList } from "_core/webtoon/post";

// ----------------------------------------------------------------------

type contentValue = "post" | "series";

const CONTENT_VALUE_LABEL: Record<contentValue, string> = {
  post: "포스트",
  series: "시리즈",
} as const;

type Sort = "LATEST" | "POPULAR" | "WPOPULAR";

const SORT_LABEL: Record<Sort, string> = {
  LATEST: "최신순",
  POPULAR: "전체 인기순",
  WPOPULAR: "주간 인기순",
};

// ----------------------------------------------------------------------

export function WebtoonPage() {
  const searchParams = useSearchParams();
  const theme = useTheme();
  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  const { channelUrl } = useParams();
  const decodedChannelUrl = useMemo(() => {
    return decodeURIComponent(channelUrl as string);
  }, [channelUrl]);

  const contents = useMemo(() => objectEntries(CONTENT_VALUE_LABEL), []);
  const sorts = useMemo(() => objectEntries(SORT_LABEL), []);

  const sortParam = useMemo(() => {
    const param = searchParams.get("sort");
    if (param && Object.keys(SORT_LABEL).includes(param)) {
      return param as Sort;
    }
    return "LATEST" as Sort;
  }, [searchParams]);

  const contentParam = useMemo(() => {
    const param = searchParams.get("webtoon");
    if (param && Object.keys(CONTENT_VALUE_LABEL).includes(param)) {
      return param as contentValue;
    }

    return "post" as contentValue;
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
                href={`/${decodedChannelUrl}/webtoon/?webtoon=${content}`}
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
      <WT_Post_Channel_RichList channelUrl={decodedChannelUrl} sort={sortParam} page={0} />
      <Box sx={{ margin: "auto", mt: 3 }}>
        <Pagination count={10} />
      </Box>
    </Stack>
  );
}
