"use client";

import NextLink from "next/link";
import { IcRoundSettingsIcon, Nav } from "@pency/ui/components";

export function StudioSidebarNav() {
  return (
    <Nav>
      <Nav.Tree>
        <Nav.Tree.BranchAnchor
          component={NextLink}
          label="설정"
          icon={<IcRoundSettingsIcon />}
          href="/studio/@채널url/setting"
        />
      </Nav.Tree>
    </Nav>
  );
}
