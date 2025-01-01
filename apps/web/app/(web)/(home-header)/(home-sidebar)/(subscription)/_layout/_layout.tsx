"use client";

import NextLink from "next/link";
import { Stack, Tab, Tabs, tabsClasses, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

// ----------------------------------------------------------------------

type NavValue = "channel";

const NAV_VALUE_LABEL: Record<NavValue, string> = {
  channel: "채널",
} as const;

type Props = {
  children: React.ReactNode;
};

// ----------------------------------------------------------------------

export function SubscriptionLayout({ children }: Props) {
  const pathname = usePathname();
  const navValue = useMemo(() => {
    const nav = pathname.split("/")[2];

    if (nav && Object.keys(NAV_VALUE_LABEL).includes(nav)) {
      return nav as NavValue;
    }

    return "post";
  }, [pathname]);

  return (
    <Stack>
      <Tabs value={navValue} scrollButtons={false} sx={{ [`& .${tabsClasses.flexContainer}`]: { gap: 2 }, mb: 2 }}>
        <Tab
          LinkComponent={NextLink}
          href={`/subscription`}
          label={<Typography variant="h6">포스트</Typography>}
          value="post"
          wrapped
        />
        <Tab
          LinkComponent={NextLink}
          href={`/subscription/channel`}
          label={<Typography variant="h6">채널</Typography>}
          value="channel"
          wrapped
        />
      </Tabs>
      {children}
    </Stack>
  );
}
