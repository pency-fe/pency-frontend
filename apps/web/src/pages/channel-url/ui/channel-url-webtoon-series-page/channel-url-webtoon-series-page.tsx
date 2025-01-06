"use client";

import NextLink from "next/link";
import {
  Accordion,
  accordionClasses,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Link,
  MenuItem,
  PaginationItem,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import {
  EvaArrowIosBackFillIcon,
  EvaArrowIosDownwardFillIcon,
  EvaBookmarkOutlineIcon,
  EvaEyeOutlineIcon,
  EvaHeartOutlineIcon,
  EvaMoreVerticalOutlineIcon,
  FilterChip,
  GravityUiCircleCheckFillIcon,
  ListItemx,
  MaterialSymbolsChatBubbleOutlineIcon,
  Menux,
  MingcuteNotificationLineIcon,
  NineteenCircleIcon,
  useMenuxState,
} from "@pency/ui/components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { usePaginationx } from "@pency/ui/hooks";
import { createQueryString } from "@pency/util";

// ----------------------------------------------------------------------

// [TODO] 지우기
const postData = {
  id: 123,
  thumbnail:
    "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
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
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12} md={4}>
        <SeriesSection />
      </Grid>
      <Grid
        item
        md
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

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton edge="start" sx={{ mr: 2 }}>
          <EvaArrowIosBackFillIcon />
        </IconButton>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton>
            <EvaBookmarkOutlineIcon />
          </IconButton>
          <IconButton>
            <MingcuteNotificationLineIcon />
          </IconButton>
          <IconButton>
            <EvaMoreVerticalOutlineIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// ----------------------------------------------------------------------

const SeriesSection = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        alignItems: "center",
        gap: 4,
        width: 1,
        backgroundColor: theme.vars.palette.background.paper,
        borderRadius: 1,
        paddingX: 3,
        paddingY: 2,
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 1,
          borderRadius: 1,
          overflow: "hidden",
          aspectRatio: 16 / 9,
        }}
      >
        <Box
          src={
            "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1"
          }
          component={LazyLoadImage}
          sx={{
            width: 1,
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: theme.spacing(0.25),
            right: theme.spacing(0.25),
            "& svg": {
              fontSize: "1rem",
            },
          }}
        >
          <NineteenCircleIcon fontSize="small" />
        </Box>
      </Box>

      <Stack sx={{ alignItems: "center", gap: 0.5 }}>
        <Typography variant="h5">천재 궁수의 스트리밍</Typography>
        {/* [TODO] href */}
        <Link
          component={NextLink}
          href={`/TODO/channelUrl`}
          variant="overline"
          sx={{
            "&:hover": {
              textDecoration: "none", // 호버 시 밑줄 제거
            },
          }}
        >
          김천재
        </Link>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: theme.vars.palette.text.secondary }}>
          <Typography variant="caption">연재/15화</Typography>

          <Typography variant="caption">•</Typography>
          <EvaEyeOutlineIcon />
          <Typography variant="caption">1.5만</Typography>

          <Typography variant="caption">•</Typography>
          <EvaHeartOutlineIcon />
          <Typography variant="caption">1만</Typography>

          <Typography variant="caption">•</Typography>
          <MaterialSymbolsChatBubbleOutlineIcon />
          <Typography variant="caption">1.3천</Typography>
        </Box>
      </Stack>

      {/* [TODO] 자신의 시리즈일 때는 신규회차 등록 버튼 한개만 존재 */}
      <Box sx={{ display: "flex", gap: 1, width: 1 }}>
        <Button fullWidth variant="soft">
          첫 화 보기
        </Button>
        <Button fullWidth variant="soft">
          다음 화 보기
        </Button>
      </Box>

      <Accordion
        disableGutters
        sx={{
          borderRadius: 1,
          width: 1,
          bgcolor: theme.vars.palette.background.neutral,
          [`&.${accordionClasses.expanded}`]: {
            bgcolor: theme.vars.palette.background.neutral,
            boxShadow: "none",
          },
          [`&.${accordionClasses.root}::before`]: {
            height: 0,
          },
        }}
      >
        <AccordionSummary expandIcon={<EvaArrowIosDownwardFillIcon />}>
          <Typography>정보</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={3}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
              leo lobortis eget.
            </Typography>
            <Stack spacing={1}>
              <Typography>키워드</Typography>
              <Box sx={{ display: "flex", gap: 1, overflow: "hidden", flexWrap: "wrap" }}>
                {Array.from({ length: 10 }, (_, i) => (
                  <Chip key={i} label={`키워드${i}`} size="small" variant="soft" />
                ))}
              </Box>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

// ----------------------------------------------------------------------

const EpisodeSection = () => {
  const theme = useTheme();
  const { anchorRef, isOpen, close, toggle } = useMenuxState<HTMLDivElement>();

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
    <Stack sx={{ width: 1, backgroundColor: theme.vars.palette.background.paper, borderRadius: 1, padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
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

      {Array.from({ length: 18 }, (_, i) => (
        <ListItemx
          key={i}
          slots={{
            overlayElement: (
              <ListItemx.OverlayAnchor href={`/@${postData.channel.channelUrl}/webtoon/post/${postData.id}`} />
            ),
            thumbnail: (
              <ListItemx.Thumbnail
                slots={{
                  image: <ListItemx.Thumbnail.Image src={null} />,
                  topEnd: postData.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
                }}
                sx={{ aspectRatio: "16/9" }}
              />
            ),
            labels: (
              <>
                {postData.price && (
                  <ListItemx.Labels
                    variant="soft"
                    color="primary"
                    slots={{ startIcon: postData.purchased ? <GravityUiCircleCheckFillIcon /> : null }}
                  >
                    {postData.price}P
                  </ListItemx.Labels>
                )}
              </>
            ),
            title: <ListItemx.Title>{postData.title}</ListItemx.Title>,
            attribute: (
              <ListItemx.Attribute>
                {postData.channel.name}
                <ListItemx.Attribute.Dot />
                <EvaEyeOutlineIcon />
                {postData.viewCount}
                <ListItemx.Attribute.Dot />
                <EvaHeartOutlineIcon />
                {postData.likeCount}
                <ListItemx.Attribute.Dot />
                <MaterialSymbolsChatBubbleOutlineIcon />
                {postData.commentCount}
              </ListItemx.Attribute>
            ),
            trailing: (
              <Typography variant="body2" color={theme.vars.palette.text.secondary}>
                {postData.createdAt}
              </Typography>
            ),
          }}
        />
      ))}

      <Box sx={{ margin: "auto", mt: 3 }}>
        {paginations.map((pagination) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("page", `${pagination.page}`);
          return <PaginationItem component={NextLink} href={`/TODO`} {...pagination} />;
        })}
      </Box>
    </Stack>
  );
};
