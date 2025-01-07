"use client";

import NextLink from "next/link";
import {
  Accordion,
  accordionClasses,
  AccordionDetails,
  AccordionSummary,
  accordionSummaryClasses,
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
  SolarCheckCircleLinearIcon,
  useMenuxState,
} from "@pency/ui/components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { usePaginationx } from "@pency/ui/hooks";

// ----------------------------------------------------------------------

const episodeData = {
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
      <Grid item xs={12} md={4}>
        <SeriesSection
          sx={{
            position: "sticky",
            top: "64px",
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

const SeriesSection = ({ ...rest }) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        borderStartStartRadius: 16,
        borderStartEndRadius: 16,
        overflow: "hidden",
        [theme.breakpoints.down("md")]: { borderRadius: 0 },
        ...rest.sx,
      }}
    >
      <Stack spacing={3} sx={{ position: "relative", pt: 2.5, paddingX: 3 }}>
        <ThumbnailGradient />
        <Thumbnail />

        <Info />

        <ActionButtons />
      </Stack>

      <Stack spacing={1.5} sx={{ paddingX: 3, pb: 2.5 }}>
        <ViewButtons />
        <Description />
      </Stack>
    </Stack>
  );
};

const Thumbnail = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
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
  );
};

const ThumbnailGradient = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 1,
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
            filter: "blur(16px)",
          }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), ${theme.vars.palette.background.default})`,
        }}
      />
    </>
  );
};

const Info = () => {
  const theme = useTheme();

  return (
    <Stack sx={{ alignItems: "center", gap: 0.5, zIndex: 1 }}>
      <Typography variant="h5">천재 궁수의 스트리밍</Typography>
      {/* [TODO] href */}
      <Link
        component={NextLink}
        href={`/TODO/channelUrl`}
        variant="overline"
        sx={{
          "&:hover": {
            textDecoration: "none",
          },
        }}
      >
        김천재
      </Link>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          color: theme.vars.palette.text.secondary,
          wordBreak: "keep-all",
        }}
      >
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
  );
};

const ActionButtons = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
      <IconButton variant="soft">
        <EvaBookmarkOutlineIcon />
      </IconButton>
      <IconButton variant="soft">
        <MingcuteNotificationLineIcon />
      </IconButton>
      <IconButton variant="soft">
        <EvaMoreVerticalOutlineIcon />
      </IconButton>
    </Box>
  );
};

const ViewButtons = () => {
  return (
    <>
      {/* [TODO] 자신의 시리즈일 때는 신규회차 등록 버튼 한개만 존재 */}
      <Box sx={{ display: "flex", gap: 1, width: 1 }}>
        <Button fullWidth variant="soft">
          첫 화 보기
        </Button>
        <Button fullWidth variant="soft" color="primary">
          다음 화 보기
        </Button>
      </Box>
    </>
  );
};

const Description = () => {
  const theme = useTheme();

  return (
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
      <AccordionSummary
        expandIcon={<EvaArrowIosDownwardFillIcon />}
        sx={{
          minHeight: "fit-content",
          [`& .${accordionSummaryClasses.content}`]: {
            my: "6px",
          },
        }}
      >
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
  );
};
// ----------------------------------------------------------------------

const EpisodeSection = () => {
  const theme = useTheme();

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
    <Stack>
      <EpisodeListHeader />

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

const EpisodeListHeader = () => {
  const theme = useTheme();
  const { anchorRef, isOpen, close, toggle } = useMenuxState<HTMLDivElement>();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
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
