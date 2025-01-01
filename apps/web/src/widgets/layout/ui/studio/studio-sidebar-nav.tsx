"use client";

import NextLink from "next/link";
import { IcRoundSettingsIcon, Nav } from "@pency/ui/components";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";

export const StudioSidebarNav = () => {
  const channelUrl = useChannelUrlParam();

  return (
    <Nav>
      <Nav.Tree>
        {/* published / drafts / trash */}
        <Nav.Tree.BranchAnchor
          component={NextLink}
          label="포스트"
          icon={<IcRoundSettingsIcon />}
          href={`/studio/${channelUrl}/posts/published`}
        />

        <Nav.Tree.BranchAnchor
          component={NextLink}
          label="시리즈"
          icon={<IcRoundSettingsIcon />}
          href={`/studio/${channelUrl}/series`}
        />

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
