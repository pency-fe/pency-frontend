"use client";

import NextLink from "next/link";
import { Stack, Tab, Tabs, tabsClasses, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { objectEntries } from "@pency/util";

// ----------------------------------------------------------------------

type NavValue = "bookmark" | "purchase" | "like";

const NAV_VALUE_LABEL: Record<NavValue, string> = {
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

    if (nav && Object.keys(NAV_VALUE_LABEL).includes(nav)) {
      return nav as NavValue;
    }

    return "view";
  }, [pathname]);

  return (
    <Stack>
      <Tabs value={navValue} scrollButtons={false} sx={{ [`& .${tabsClasses.flexContainer}`]: { gap: 2 }, mb: 2 }}>
        <Tab
          LinkComponent={NextLink}
          href={`/library/view`}
          label={<Typography variant="h6">최근 본</Typography>}
          value="view"
          wrapped
        />
        {objectEntries(NAV_VALUE_LABEL).map(([value, label]) => (
          <Tab
            key={value}
            LinkComponent={NextLink}
            href={`/library/${value}`}
            label={<Typography variant="h6">{label}</Typography>}
            value={value}
            wrapped
          />
        ))}
      </Tabs>
      {children}
    </Stack>
  );
}
