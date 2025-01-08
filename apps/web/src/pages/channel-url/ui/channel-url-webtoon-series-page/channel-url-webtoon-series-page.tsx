"use client";

import NextLink from "next/link";
import { Box, Button, Grid, MenuItem, PaginationItem, Stack, Typography, useTheme } from "@mui/material";
import {
  EvaEyeOutlineIcon,
  EvaHeartOutlineIcon,
  FilterChip,
  GravityUiCircleCheckFillIcon,
  ListItemx,
  MaterialSymbolsChatBubbleOutlineIcon,
  Menux,
  NineteenCircleIcon,
  SolarCheckCircleLinearIcon,
  useMenuxState,
} from "@pency/ui/components";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { usePaginationx } from "@pency/ui/hooks";
import { SeriesSection } from "./series-section";

// ----------------------------------------------------------------------

const episodeData = {
  id: 123,
  thumbnail: "https://dev-s3.pency.co.kr/text_logo.png",
  age: "NINETEEN",
  price: 300,
  purchased: true,
  // title: "천재 궁수의 스트리밍1 천재 궁수의 스트리밍2 천재 궁수의 스트리밍3 천재 궁수의 스트리밍4",
  title: "천재 궁수의 스트리밍",
  channel: {
    channelUrl: "dddddd",
    name: "김천재의 채널",
  },
  viewCount: 120,
  likeCount: 100,
  commentCount: 80,
  createdAt: "24.05.13",
};

export const ChannelUrlWebtoonSeriesPage = () => {
  const theme = useTheme();
  // 여기 부분은 구조 잡는 부분 (Grid)
  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        <SeriesSection
          sx={{
            position: "sticky",
            top: "56px",
            alignItems: "center",
            gap: 3,
          }}
        />
      </Grid>
      <Grid
        item
        xs
        sx={{
          [theme.breakpoints.up("md")]: {
            ml: 1,
          },
          [theme.breakpoints.down("md")]: {
            mt: 1,
          },
        }}
      >
        <EpisodeSection />
      </Grid>
    </Grid>
  );
};

// ----------------------------------------------------------------------

const EpisodeSection = () => {
  return (
    <Stack>
      <EpisodeListHeader />
      <EpisodeList />
      <EpisodePagination />
    </Stack>
  );
};

const EpisodeListHeader = () => {
  const theme = useTheme();
  const { anchorRef, isOpen, close, toggle } = useMenuxState<HTMLDivElement>();

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: "52px",
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
          bgcolor: theme.vars.palette.background.default,
          zIndex: 1,
          [theme.breakpoints.up("sm")]: {
            top: "55px",
          },
        }}
      >
        <Button startIcon={<SolarCheckCircleLinearIcon />}>선택 구매</Button>

        <FilterChip ref={anchorRef} label={"최신순"} open={isOpen} onClick={toggle} />
      </Box>
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
        <MenuItem>최신순</MenuItem>
        <MenuItem>첫화부터</MenuItem>
      </Menux>
    </>
  );
};

const EpisodeList = () => {
  const theme = useTheme();

  return (
    <>
      {Array.from({ length: 18 }, (_, i) => (
        <ListItemx
          key={i}
          slots={{
            overlayElement: (
              <ListItemx.OverlayAnchor href={`/@${episodeData.channel.channelUrl}/webtoon/post/${episodeData.id}`} />
            ),
            thumbnail: (
              <ListItemx.Thumbnail
                slots={{
                  image: <ListItemx.Thumbnail.Image src={null} />,
                  topEnd: episodeData.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
                }}
                sx={{ aspectRatio: "16/9" }}
              />
            ),
            labels: (
              <>
                {episodeData.price && (
                  <ListItemx.Labels
                    variant="soft"
                    color="primary"
                    slots={{ startIcon: episodeData.purchased ? <GravityUiCircleCheckFillIcon /> : null }}
                  >
                    {episodeData.price}P
                  </ListItemx.Labels>
                )}
              </>
            ),
            title: <ListItemx.Title>{episodeData.title}</ListItemx.Title>,
            attribute: (
              <ListItemx.Attribute>
                {episodeData.channel.name}
                <ListItemx.Attribute.Dot />
                <EvaEyeOutlineIcon />
                {episodeData.viewCount}
                <ListItemx.Attribute.Dot />
                <EvaHeartOutlineIcon />
                {episodeData.likeCount}
                <ListItemx.Attribute.Dot />
                <MaterialSymbolsChatBubbleOutlineIcon />
                {episodeData.commentCount}
              </ListItemx.Attribute>
            ),
            trailing: (
              <Typography variant="caption" color={theme.vars.palette.text.secondary}>
                {episodeData.createdAt}
              </Typography>
            ),
          }}
        />
      ))}
    </>
  );
};

const EpisodePagination = () => {
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
    <Box sx={{ margin: "auto", mt: 3 }}>
      {paginations.map((pagination) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", `${pagination.page}`);
        return <PaginationItem component={NextLink} href={`/TODO`} {...pagination} />;
      })}
    </Box>
  );
};
