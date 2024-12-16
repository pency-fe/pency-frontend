"use client";

import NextLink from "next/link";
import { IcRoundSettingsIcon, MiniNav } from "@pency/ui/components";

export function StudioSidebarMiniNav() {
  return (
    <MiniNav>
      <MiniNav.Tree>
        <MiniNav.Tree.BranchAnchor
          component={NextLink}
          label="설정"
          icon={<IcRoundSettingsIcon />}
          href="/studio/@채널url/setting"
        />
      </MiniNav.Tree>
    </MiniNav>
  );
}
