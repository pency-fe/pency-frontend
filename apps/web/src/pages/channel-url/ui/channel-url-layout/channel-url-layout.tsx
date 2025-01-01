"use client";

import { useMemo } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Box, Grid, Stack, Tab, Tabs, tabsClasses, Typography, useTheme } from "@mui/material";
import { objectEntries } from "@pency/util";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";
import { ChDetail } from "@/features/channel";

// ----------------------------------------------------------------------

type PlatformValue = "webtoon";

const PLATFORM_VALUE_LABEL: Record<PlatformValue, string> = {
  webtoon: "웹툰",
} as const;

// ----------------------------------------------------------------------

export function ChannelUrlLayout({ children }: { children?: React.ReactNode }) {
  const theme = useTheme();
  const pathname = usePathname();
  const channelUrl = useChannelUrlParam();

  const platform = useMemo(() => {
    const platform = pathname.split("/")[2];

    if (platform && Object.keys(PLATFORM_VALUE_LABEL).includes(platform)) {
      return platform as PlatformValue;
    }

    return "home";
  }, [pathname]);

  const platfromEntries = useMemo(() => objectEntries(PLATFORM_VALUE_LABEL), []);

  return (
    <>
      <ChDetail>
        <ChDetail.BgImage />
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
              <ChDetail.Image />
            </Grid>

            <Grid item xs sm={false}>
              <Stack
                sx={{
                  alignItems: "flex-start",
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
                <ChDetail.Title />
                <ChDetail.Attribute />
                <ChDetail.Description />
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
              <ChDetail.SubscriptionOrStudioButton fullWidth />
              <ChDetail.ShareIconButton />
            </Box>
          </Grid>
        </Grid>
      </ChDetail>

      <Tabs
        value={platform}
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
        {platfromEntries.map(([value, label]) => (
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
