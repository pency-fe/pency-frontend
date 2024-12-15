"use client";

import NextLink from "next/link";
import { Nav } from "@pency/ui/components";

export function StudioSidebarNav() {
  return (
    <Nav>
      <Nav.Tree>
        <Nav.Tree.BranchAnchor component={NextLink} label="채널" href="/studio/@채널url/setting" />
      </Nav.Tree>
    </Nav>
  );
}
