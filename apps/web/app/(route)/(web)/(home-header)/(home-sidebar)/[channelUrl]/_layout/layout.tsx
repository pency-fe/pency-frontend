"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  styled,
  Tab,
  Tabs,
  tabsClasses,
  Typography,
  typographyClasses,
  useTheme,
} from "@mui/material";
import { EvaArrowIosForwardFillIcon, FluentShare24RegularIcon, MaterialSymbolsCloseIcon } from "@pency/ui/components";
import { maxLine } from "@pency/ui/util";
import { objectEntries } from "@pency/util";
import NextLink from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo, useState } from "react";

// ----------------------------------------------------------------------

type NavPlatformValue = "webtoon";

const NAV_PLATFORM_VALUE_LABEL: Record<NavPlatformValue, string> = {
  webtoon: "웹툰",
} as const;

type Props = {
  children: React.ReactNode;
};

// ----------------------------------------------------------------------

export default function ChannelUrlLayout({ children }: Props) {
  const theme = useTheme();
  const pathname = usePathname();
  const { channelUrl } = useParams();
  const decodedChannelUrl = useMemo(() => {
    return decodeURIComponent(channelUrl as string);
  }, [channelUrl]);

  const navValue = useMemo(() => {
    const platform = pathname.split("/")[2];

    if (platform && Object.keys(NAV_PLATFORM_VALUE_LABEL).includes(platform)) {
      return platform as NavPlatformValue;
    }

    return "home";
  }, [pathname]);

  return (
    <Box>
      {/* 배경 */}
      <Box
        sx={{
          aspectRatio: "clamp(0px, calc(100% /(5)), 9999px)",
          [theme.breakpoints.up("xs")]: {
            height: "75px",
          },
          [theme.breakpoints.up("sm")]: {
            height: "152px",
            borderRadius: 1.5,
          },
          [theme.breakpoints.up("lg")]: {
            height: "216px",
            borderRadius: 1.5,
          },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1"
          sx={{ position: "absolute", width: 1, height: 1, objectFit: "cover" }}
        />
      </Box>
      {/* 정보 */}
      <Box
        sx={{
          [theme.breakpoints.up("xs")]: {
            padding: "16px 0 4px 0",
            gap: 1.5,
          },
          [theme.breakpoints.up("sm")]: {
            padding: "24px 0 8px 0",
            gap: 2,
          },
          display: "flex",
        }}
      >
        {/* 정보_프로필 */}
        <Box
          sx={{
            [theme.breakpoints.up("xs")]: {
              width: 68,
              minWidth: 68,
              height: 68,
              borderRadius: 1,
            },
            [theme.breakpoints.up("sm")]: {
              width: 96,
              minWidth: 96,
              height: 96,
              borderRadius: 1.5,
            },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png"
            sx={{ position: "absolute", width: 1, height: 1, objectFit: "cover" }}
          />
        </Box>

        {/* 정보_세부 */}
        <Stack sx={{ display: "flex", maxWidth: "600px" }}>
          <Typography
            sx={{
              ...maxLine({ line: 1 }),
              [theme.breakpoints.up("xs")]: {
                ...theme.typography.subtitle1,
              },
              [theme.breakpoints.up("sm")]: {
                ...theme.typography.h4,
              },
            }}
          >
            채널명 채널명 채널명
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontWeight: 400,
              color: theme.vars.palette.text.secondary,
              [`& .${typographyClasses.root}`]: {
                [theme.breakpoints.up("xs")]: {
                  ...theme.typography.caption,
                  maxWidth: 80,
                },
                [theme.breakpoints.up("sm")]: {
                  ...theme.typography.body1,
                  maxWidth: 160,
                },
              },
            }}
          >
            <Link
              component={NextLink}
              href="TODO_프로필"
              color={theme.vars.palette.text.primary}
              sx={{
                ...maxLine({ line: 1 }),
              }}
            >
              프로필명프로필명프로필
            </Link>
            <Typography>•</Typography>
            <Typography>구독자 8천명</Typography>
            <Typography>•</Typography>
            <Typography>포스트 1.1개</Typography>
          </Box>

          <InfoDialog />
        </Stack>

        {/* 버튼 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            ml: "auto",
            [theme.breakpoints.down("sm")]: {
              display: "none",
            },
          }}
        >
          <Button variant="contained">구독</Button>
          <IconButton variant="soft" sx={{ borderRadius: 1 }}>
            <FluentShare24RegularIcon />
          </IconButton>
        </Box>
      </Box>
      {/* 버튼 */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          [theme.breakpoints.up("sm")]: {
            display: "none",
          },
        }}
      >
        <Button variant="contained" fullWidth>
          구독
        </Button>
        <IconButton variant="soft" sx={{ borderRadius: 1 }}>
          <FluentShare24RegularIcon />
        </IconButton>
      </Box>

      {/* 탭 */}
      <Tabs value={navValue} scrollButtons={false} sx={{ [`& .${tabsClasses.flexContainer}`]: { gap: 2 }, mb: 2 }}>
        <Tab
          LinkComponent={NextLink}
          href={`/${decodedChannelUrl}`}
          label={<Typography variant="subtitle2">홈</Typography>}
          value="home"
          wrapped
        />
        {objectEntries(NAV_PLATFORM_VALUE_LABEL).map(([value, label]) => (
          <Tab
            key={value}
            LinkComponent={NextLink}
            href={`/${decodedChannelUrl}/${value}`}
            label={<Typography variant="subtitle2">{label}</Typography>}
            value={value}
            wrapped
          />
        ))}
      </Tabs>
      {children}
    </Box>
  );
}

// ----------------------------------------------------------------------

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function InfoDialog() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpenClick = () => {
    setOpen(true);
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "26px",
          color: theme.vars.palette.text.secondary,
          cursor: "pointer",
        }}
        onClick={handleOpenClick}
      >
        <Typography
          sx={{
            ...maxLine({ line: 1 }),
            [theme.breakpoints.up("xs")]: {
              ...theme.typography.caption,
            },
            [theme.breakpoints.up("sm")]: {
              ...theme.typography.body1,
            },
          }}
        >
          {/* 없을 경우, 채널 정보 */}
          ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
          ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ
        </Typography>
        <EvaArrowIosForwardFillIcon />

        <BootstrapDialog onClose={handleCloseClick} open={open}>
          <DialogTitle sx={{ m: 0, p: 2 }}>채널 및 크리에이터 정보</DialogTitle>
          <IconButton
            onClick={handleOpenClick}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <MaterialSymbolsCloseIcon />
          </IconButton>
          <DialogContent></DialogContent>
        </BootstrapDialog>
      </Box>
    </>
  );
}
