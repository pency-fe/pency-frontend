"use client";

import NextLink from "next/link";
import { FluentDrawImage24FilledIcon, FluentDrawText24FilledIcon, Nav } from "@pency/ui/components";

export function HomeSidebarNav() {
  return (
    <Nav>
      <Nav.Tree>
        <Nav.Tree.Branch icon={<FluentDrawImage24FilledIcon />} label="웹툰" startsWith="/webtoon">
          <Nav.Tree.Branch.LeafAnchor component={NextLink} label="시리즈" href="/webtoon/series" />
          <Nav.Tree.Branch.LeafAnchor component={NextLink} label="포스트" href="/webtoon/post" />
        </Nav.Tree.Branch>
        {/* <Nav.Tree.Branch icon={<FluentDrawText24FilledIcon />} label="웹소설" startsWith="/webnovel">
          <Nav.Tree.Branch.LeafAnchor component={NextLink} label="시리즈" href="/webnovel/series" />
          <Nav.Tree.Branch.LeafAnchor component={NextLink} label="포스트" href="/webnovel/post" />
        </Nav.Tree.Branch> */}
      </Nav.Tree>
    </Nav>
  );
}
