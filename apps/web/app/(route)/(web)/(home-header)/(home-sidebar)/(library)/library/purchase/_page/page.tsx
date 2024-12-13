"use client";

import NextLink from "next/link";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  MenuItem,
  menuItemClasses,
  PaginationItem,
  RadioGroup,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  EvaArrowIosDownwardFillIcon,
  EvaArrowIosUpwardFillIcon,
  EvaMoreVerticalOutlineIcon,
  ListItemx,
  listItemxClasses,
  Menux,
  NineteenCircleIcon,
  RadioButton,
  useMenuxState,
} from "@pency/ui/components";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { createQueryString, objectEntries, useToggle } from "@pency/util";
import { usePaginationx } from "@pency/ui/hooks";
import { hideScrollX } from "@pency/ui/util";
import { CREATION_TYPE_LABEL, PAIR_LABEL } from "_core/webtoon/post/const";
import { GENRE_LABEL } from "_core/webtoon/const";

// ----------------------------------------------------------------------

type contentValue = "WEBTOON" | "WEBNOBEL";

const CONTENT_VALUE_LABEL: Record<contentValue, string> = {
  WEBTOON: "웹툰",
  WEBNOBEL: "웹소설",
} as const;

// ----------------------------------------------------------------------

export default function LibraryPurchasePage() {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const [filter, toggleFilter] = useToggle(false);

  const saveFilter = () => {
    toggleFilter(false);
  };

  const contents = useMemo(() => objectEntries(CONTENT_VALUE_LABEL), []);
  const creationTypes = useMemo(() => objectEntries(CREATION_TYPE_LABEL), []);
  const pairs = useMemo(() => objectEntries(PAIR_LABEL), []);
  const genres = useMemo(() => objectEntries(GENRE_LABEL), []);

  const contentParam = useMemo(() => {
    const param = searchParams.get("content");
    if (param && Object.keys(CONTENT_VALUE_LABEL).includes(param)) {
      return param as contentValue;
    }

    return "ALL" as contentValue;
  }, [searchParams]);

  return (
    <Stack spacing={1}>
      <RadioGroup value={contentParam}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          <RadioButton
            value="ALL"
            LinkComponent={NextLink}
            href={(() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete("content");
              return `/library/purchase`;
            })()}
            sx={{ flexShrink: 0 }}
          >
            전체
          </RadioButton>
          {contents.map(([content, label]) => (
            <RadioButton
              value={content}
              key={content}
              LinkComponent={NextLink}
              href={(() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("content", content);
                params.delete("page");
                return `/library/purchase${createQueryString(params)}`;
              })()}
              sx={{ flexShrink: 0 }}
            >
              {label}
            </RadioButton>
          ))}
        </Box>
      </RadioGroup>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            endIcon={filter ? <EvaArrowIosUpwardFillIcon /> : <EvaArrowIosDownwardFillIcon />}
            onClick={toggleFilter}
          >
            창작유형
          </Button>
          <Button
            variant="outlined"
            endIcon={filter ? <EvaArrowIosUpwardFillIcon /> : <EvaArrowIosDownwardFillIcon />}
            onClick={toggleFilter}
          >
            페어
          </Button>
          <Button
            variant="outlined"
            endIcon={filter ? <EvaArrowIosUpwardFillIcon /> : <EvaArrowIosDownwardFillIcon />}
            onClick={toggleFilter}
          >
            장르
          </Button>
        </Box>
      </Box>

      <Collapse in={filter}>
        <Stack
          spacing={2}
          sx={{ bgcolor: theme.vars.palette.background.paper, borderRadius: 1, px: "20px", py: "12px" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ width: 100, flexShrink: 0 }}>창작유형</Typography>
            <RadioGroup sx={{ flexDirection: "row", flexWrap: "nowrap", gap: 1, overflowX: "scroll", ...hideScrollX }}>
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
            <RadioGroup sx={{ flexDirection: "row", flexWrap: "nowrap", gap: 1, overflowX: "scroll", ...hideScrollX }}>
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ width: 100, flexShrink: 0 }}>장르</Typography>
            <RadioGroup sx={{ flexDirection: "row", flexWrap: "nowrap", gap: 1, overflowX: "scroll", ...hideScrollX }}>
              <RadioButton value="ALL" size="small" sx={{ flexShrink: 0 }}>
                전체
              </RadioButton>
              {genres.map(([genre, label]) => {
                return (
                  <RadioButton key={genre} value={genre} size="small" sx={{ flexShrink: 0 }}>
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

      <Stack spacing={0.5}>
        {/* {contentParam !== "WEBNOBEL" && contentParam !== "WEBTOON" ? <WebListItemx /> : null} */}
        {contentParam === "WEBTOON" ? Array.from({ length: 18 }, (_, i) => <WebtoonListItemx key={i} />) : null}
        {/* {contentParam === "WEBNOBEL" ? <WebnobelListItemx /> : null} */}
      </Stack>

      <Box sx={{ margin: "auto", mt: 3 }}>
        <Pagination />
      </Box>
    </Stack>
  );
}

// ----------------------------------------------------------------------
const postData = {
  id: 123,
  thumbnail:
    "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
  age: "NINETEEN",

  title: "4화 천재 궁수의 스트리밍",
  channel: {
    channelUrl: "dddddd",
    name: "김천재의 채널",
  },
  series: null, // 값이 없으면 null
};

function WebtoonListItemx() {
  const theme = useTheme();
  const { anchorRef, isOpen, close, toggle } = useMenuxState();

  return (
    <ListItemx
      slots={{
        overlayElement: (
          <ListItemx.OverlayAnchor href={`/@${postData.channel.channelUrl}/webtoon/post/${postData.id}`} />
        ),
        thumbnail: (
          <ListItemx.Thumbnail
            slots={{
              image: <ListItemx.Thumbnail.Image src={postData.thumbnail} />,
              topEnd: postData.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
            }}
            sx={{ aspectRatio: "16/9" }}
          />
        ),
        title: <ListItemx.Title>{postData.title}</ListItemx.Title>,
        attribute: (
          <ListItemx.Attribute>
            {postData.channel.name}
            {postData.series ? (
              <>
                <ListItemx.Attribute.Dot />
                {postData.series}
              </>
            ) : null}
          </ListItemx.Attribute>
        ),
        trailing: (
          <>
            <ListItemx.Trailing>
              <IconButton ref={anchorRef} onClick={toggle}>
                <EvaMoreVerticalOutlineIcon />
              </IconButton>
            </ListItemx.Trailing>

            <Menux open={isOpen} anchorEl={anchorRef.current} placement="left-start" onClose={close}>
              <MenuItem>소장본 보기</MenuItem>
              <MenuItem sx={{ [`&.${menuItemClasses.root}`]: { color: theme.vars.palette.error.main } }}>
                구매 목록에서 삭제
              </MenuItem>
            </Menux>
          </>
        ),
      }}
      sx={{
        flexShrink: 0,
        [`&.${listItemxClasses.root}`]: {
          [theme.breakpoints.up("sm")]: {
            height: "80px",
          },
        },
      }}
    />
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
          <PaginationItem component={NextLink} href={`/library/purchase${createQueryString(params)}`} {...pagination} />
        );
      })}
    </>
  );
}
