"use client";

import { useMemo } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Stack, Tab, Tabs, tabsClasses, Typography } from "@mui/material";
import { arrayIncludes, objectEntries, objectKeys } from "@pency/util";

// ----------------------------------------------------------------------

type NavValue = "view" | "bookmark" | "purchase" | "like";

const NAV_VALUE_LABEL: Record<NavValue, string> = {
  view: "최근 본",
  bookmark: "북마크",
  purchase: "구매",
  like: "좋아요",
} as const;

type Props = {
  children: React.ReactNode;
};

// ----------------------------------------------------------------------

export function LibraryLayout({ children }: Props) {
  const pathname = usePathname();
  const navValue = useMemo(() => {
    const nav = pathname.split("/")[2];

    if (nav && arrayIncludes(objectKeys(NAV_VALUE_LABEL), nav)) {
      return nav as NavValue;
    }

    return "view" as NavValue;
  }, [pathname]);

  return (
    <Stack>
      <Tabs value={navValue} scrollButtons={false} sx={{ [`& .${tabsClasses.flexContainer}`]: { gap: 2 }, mb: 2 }}>
        {objectEntries(NAV_VALUE_LABEL).map(([value, label]) => (
          <Tab
            key={value}
            LinkComponent={NextLink}
            href={`/library/${value}`}
            label={<Typography variant="subtitle1">{label}</Typography>}
            value={value}
            wrapped
          />
        ))}
      </Tabs>
      {children}
    </Stack>
  );
}
