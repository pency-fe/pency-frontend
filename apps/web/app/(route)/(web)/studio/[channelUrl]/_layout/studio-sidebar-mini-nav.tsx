"use client";

import NextLink from "next/link";
import { IcRoundSettingsIcon, MiniNav } from "@pency/ui/components";
import { useChannelUrlParam } from "_hooks";

export function StudioSidebarMiniNav() {
  const channelUrl = useChannelUrlParam();

  return (
    <MiniNav>
      <MiniNav.Tree>
        <MiniNav.Tree.BranchAnchor
          component={NextLink}
          label="설정"
          icon={<IcRoundSettingsIcon />}
          href={`/studio/${channelUrl}/setting`}
        />
      </MiniNav.Tree>
    </MiniNav>
  );
}
