"use client";

import NextLink from "next/link";
import { IcRoundSettingsIcon, Nav } from "@pency/ui/components";
import { useChannelUrlParam } from "_hooks";

export function StudioSidebarNav() {
  const channelUrl = useChannelUrlParam();

  return (
    <Nav>
      <Nav.Tree>
        <Nav.Tree.BranchAnchor
          component={NextLink}
          label="설정"
          icon={<IcRoundSettingsIcon />}
          href={`/studio/${channelUrl}/setting`}
        />
      </Nav.Tree>
    </Nav>
  );
}
