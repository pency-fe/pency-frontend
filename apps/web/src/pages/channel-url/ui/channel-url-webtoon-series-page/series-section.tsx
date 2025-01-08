"use client";

import NextLink from "next/link";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";
import {
  Stack,
  Box,
  Typography,
  IconButton,
  Button,
  Accordion,
  accordionClasses,
  AccordionSummary,
  accordionSummaryClasses,
  AccordionDetails,
  Chip,
  useTheme,
  Link,
} from "@mui/material";
import {
  NineteenCircleIcon,
  EvaEyeOutlineIcon,
  EvaHeartOutlineIcon,
  MaterialSymbolsChatBubbleOutlineIcon,
  EvaBookmarkOutlineIcon,
  MingcuteNotificationLineIcon,
  EvaMoreVerticalOutlineIcon,
  EvaArrowIosDownwardFillIcon,
} from "@pency/ui/components";
import { LazyLoadImage } from "react-lazy-load-image-component";

// ----------------------------------------------------------------------

export const SeriesSection = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        borderStartStartRadius: 16,
        borderStartEndRadius: 16,
        overflow: "hidden",
        [theme.breakpoints.down("md")]: { borderRadius: 0 },
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
        src={"https://dev-s3.pency.co.kr/text_logo.png"}
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
          src={"https://dev-s3.pency.co.kr/text_logo.png"}
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
  const channelUrl = useChannelUrlParam();

  return (
    <Stack sx={{ alignItems: "center", gap: 0.5, zIndex: 1 }}>
      <Typography variant="h5">천재 궁수의 스트리밍</Typography>
      <Link
        component={NextLink}
        href={`/${channelUrl}`}
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
        <Button fullWidth variant="soft" color="primary">
          첫 화 보기
        </Button>
        <Button fullWidth variant="soft">
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
      <AccordionDetails sx={{ maxHeight: 320, overflow: "scroll" }}>
        <Stack spacing={3}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
            eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
            blandit leo lobortis eget.
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
