"use client";

import NextLink from "next/link";
import {
  FluentDrawImage24FilledIcon,
  FluentDrawText24FilledIcon,
  IcRoundSettingsIcon,
  Nav,
} from "@pency/ui/components";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";

export const StudioSidebarNav = () => {
  const channelUrl = useChannelUrlParam();

  return (
    <Nav>
      <Nav.Tree>
        <Nav.Tree.Branch
          icon={<FluentDrawImage24FilledIcon />}
          label="웹툰"
          startsWith={`/studio/${channelUrl}/webtoon`}
        >
          <Nav.Tree.Branch.LeafAnchor
            component={NextLink}
            label="시리즈"
            href={`/studio/${channelUrl}/webtoon/series`}
          />
          {/* published / drafts / trash */}
          <Nav.Tree.Branch.LeafAnchor
            component={NextLink}
            label="포스트"
            href={`/studio/${channelUrl}/webtoon/post/published`}
          />
        </Nav.Tree.Branch>

        {/* <Nav.Tree.Branch
          icon={<FluentDrawText24FilledIcon />}
          label="웹소설"
          startsWith={`/studio/${channelUrl}/webnovel`}
        >
          <Nav.Tree.Branch.LeafAnchor
            component={NextLink}
            label="시리즈"
            href={`/studio/${channelUrl}/webnovel/series`}
          />
          <Nav.Tree.Branch.LeafAnchor
            component={NextLink}
            label="포스트"
            href={`/studio/${channelUrl}/webnovel/post/published`}
          />
        </Nav.Tree.Branch> */}

        {/* insights, daily, monthly, total, reports  */}
        <Nav.Tree.BranchAnchor
          component={NextLink}
          label="통계"
          icon={<IcRoundSettingsIcon />}
          href={`/studio/${channelUrl}/statistics/insights`}
        />

        <Nav.Tree.BranchAnchor
          component={NextLink}
          label="구독자"
          icon={<IcRoundSettingsIcon />}
          href={`/studio/${channelUrl}/subscribers`}
        />

        <Nav.Tree.BranchAnchor
          component={NextLink}
          label="설정"
          icon={<IcRoundSettingsIcon />}
          href={`/studio/${channelUrl}/setting`}
        />
      </Nav.Tree>
    </Nav>
  );
};
