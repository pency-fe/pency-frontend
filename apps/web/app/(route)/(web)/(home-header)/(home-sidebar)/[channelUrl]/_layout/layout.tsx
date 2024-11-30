"use client";

import {
  Box,
  Button,
  IconButton,
  Link,
  Stack,
  Tab,
  Tabs,
  tabsClasses,
  Typography,
  typographyClasses,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { EvaArrowIosForwardFillIcon, FluentShare24RegularIcon } from "@pency/ui/components";
import { maxLine } from "@pency/ui/util";
import { objectEntries } from "@pency/util";
import NextLink from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

// ----------------------------------------------------------------------

type NavValue = "home" | "webtoon";

const NAV_VALUE_LABEL: Record<NavValue, string> = {
  home: "홈",
  webtoon: "웹툰",
} as const;

type Props = {
  children: React.ReactNode;
};

// ----------------------------------------------------------------------

export default function ChannelUrlLayout({ children }: Props) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { channelUrl } = useParams();
  const decodedChannelUrl = useMemo(() => {
    return decodeURIComponent(channelUrl as string);
  }, [channelUrl]);

  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  const navValue = useMemo(() => {
    const platform = pathname.replace(`/${decodedChannelUrl}/`, "");

    if (platform && Object.keys(NAV_VALUE_LABEL).includes(platform)) {
      return platform as NavValue;
    }

    return "home" as NavValue;
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "26px",
              color: theme.vars.palette.text.secondary,
              cursor: "pointer",
            }}
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
          </Box>
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
      <Tabs
        value={navValue}
        scrollButtons={false}
        onChange={(_, value) => {
          if (value === "home") {
            router.push(`/${decodedChannelUrl}`);
            return;
          }

          if (value === "webtoon") {
            router.push(`/${decodedChannelUrl}/${value}`);
            return;
          }
        }}
        sx={{ [`& .${tabsClasses.flexContainer}`]: { gap: 2 }, mb: 2 }}
      >
        {objectEntries(NAV_VALUE_LABEL).map(([value, label]) => (
          <Tab
            LinkComponent={NextLink}
            label={<Typography variant="subtitle2">{label}</Typography>}
            value={value}
            key={value}
            wrapped
          />
        ))}
      </Tabs>
      {children}
    </Box>
  );
}
