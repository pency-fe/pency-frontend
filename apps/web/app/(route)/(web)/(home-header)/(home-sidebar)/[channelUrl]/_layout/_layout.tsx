"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { Box, Grid, Stack, Tab, Tabs, tabsClasses, Typography, useTheme } from "@mui/material";

import { objectEntries } from "@pency/util";
import { useChannelUrlParam } from "_hooks";
import { CH_Detail } from "_core/channel";

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
  const channelUrl = useChannelUrlParam();

  const navValue = useMemo(() => {
    const platform = pathname.split("/")[2];

    if (platform && Object.keys(NAV_PLATFORM_VALUE_LABEL).includes(platform)) {
      return platform as NavPlatformValue;
    }

    return "home";
  }, [pathname]);

  return (
    <>
      <CH_Detail>
        <CH_Detail.BgImage />

        <Grid
          container
          sx={{
            gap: 1,
            [theme.breakpoints.up("xs")]: {
              mt: "16px",
              mb: "8px",
            },
            [theme.breakpoints.up("sm")]: {
              mt: "24px",
              mb: "12px",
            },
          }}
        >
          <Grid
            item
            xs
            container
            wrap="nowrap"
            sx={{
              [theme.breakpoints.up("xs")]: {
                gap: 1.5,
              },
              [theme.breakpoints.up("sm")]: {
                gap: 2,
              },
            }}
          >
            <Grid item xs="auto">
              <CH_Detail.Image />
            </Grid>

            <Grid item xs sm={false}>
              <Stack
                sx={{
                  maxWidth: "600px",
                  overflow: "hidden",
                  [theme.breakpoints.up("xs")]: {
                    gap: "2px",
                  },
                  [theme.breakpoints.up("sm")]: {
                    gap: "4px",
                  },
                }}
              >
                <CH_Detail.Title />
                <CH_Detail.Attribute />
                <CH_Detail.Description />
              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={12} sm="auto">
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                ml: "auto",
              }}
            >
              <CH_Detail.SubscriptionOrStudioButton fullWidth />
              <CH_Detail.ShareIconButton />
            </Box>
          </Grid>
        </Grid>
      </CH_Detail>

      <Tabs
        value={navValue}
        scrollButtons={false}
        sx={{
          [`& .${tabsClasses.flexContainer}`]: { gap: 2 },
          mb: 2,
        }}
      >
        <Tab
          LinkComponent={NextLink}
          href={`/${channelUrl}`}
          label={<Typography variant="subtitle1">홈</Typography>}
          value="home"
          wrapped
        />
        {objectEntries(NAV_PLATFORM_VALUE_LABEL).map(([value, label]) => (
          <Tab
            key={value}
            LinkComponent={NextLink}
            href={`/${channelUrl}/${value}`}
            label={<Typography variant="subtitle1">{label}</Typography>}
            value={value}
            wrapped
          />
        ))}
      </Tabs>
      {children}
    </>
  );
}
