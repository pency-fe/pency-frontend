"use client";

import { useMemo } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@mui/material";
import { FilterChip, Menux, useMenuxState } from "@pency/ui/components";
import { createQueryString, objectEntries } from "@pency/util";
import { PlatformValue, usePlatform } from "../model/platform-provider";

const PLATFORM_VALUE_LABEL: Record<PlatformValue, string> = {
  ALL: "전체",
  WEBTOON: "웹툰",
  WEBNOVEL: "웹소설",
} as const;

export const LibraryPlatformFilterChip = () => {
  const { platform } = usePlatform();
  const { anchorRef, isOpen, close, toggle } = useMenuxState<HTMLDivElement>();
  const pathname = usePathname();

  const platformEntries = useMemo(() => objectEntries(PLATFORM_VALUE_LABEL), []);

  return (
    <>
      <FilterChip ref={anchorRef} label={PLATFORM_VALUE_LABEL[platform]} open={isOpen} onClick={toggle} />
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
        {platformEntries.map(([value, label]) => {
          const params = new URLSearchParams();

          if (value !== "ALL") {
            params.set("platform", value);
          }

          return (
            <MenuItem
              key={value}
              component={NextLink}
              href={`${pathname}${createQueryString(params)}`}
              selected={platform === value}
              onClick={close}
            >
              {label}
            </MenuItem>
          );
        })}
      </Menux>
    </>
  );
};
