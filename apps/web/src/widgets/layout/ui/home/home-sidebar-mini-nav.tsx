"use client";
import NextLink from "next/link";
import { FluentDrawImage24FilledIcon, FluentDrawText24FilledIcon, MiniNav } from "@pency/ui/components";

export function HomeSidebarMiniNav() {
  return (
    <MiniNav>
      <MiniNav.Tree>
        <MiniNav.Tree.BranchAnchor
          component={NextLink}
          icon={<FluentDrawImage24FilledIcon />}
          label="웹툰"
          href="/webtoon"
        />

        {/* <MiniNav.Tree.Branch icon={<FluentDrawText24FilledIcon />} label="웹소설" startsWith="/webnovel">
          <MiniNav.Tree.Branch.LeafAnchor component={NextLink} label="시리즈" href="/webnovel/series" />
          <MiniNav.Tree.Branch.LeafAnchor component={NextLink} label="포스트" href="/webnovel/post" />
        </MiniNav.Tree.Branch> */}
      </MiniNav.Tree>
    </MiniNav>
  );
}
