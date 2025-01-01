"use client";

import NextLink from "next/link";
import { IcRoundSettingsIcon, MiniNav } from "@pency/ui/components";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";

export const StudioSidebarMiniNav = () => {
  const channelUrl = useChannelUrlParam();

  return (
    <MiniNav>
      <MiniNav.Tree>
        {/* published / drafts / trash */}
        <MiniNav.Tree.BranchAnchor
          component={NextLink}
          label="포스트"
          icon={<IcRoundSettingsIcon />}
          href={`/studio/${channelUrl}/posts/published`}
        />

        <MiniNav.Tree.BranchAnchor
          component={NextLink}
          label="시리즈"
          icon={<IcRoundSettingsIcon />}
          href={`/studio/${channelUrl}/series`}
        />

        {/* insights, daily, monthly, total, reports  */}
        <MiniNav.Tree.BranchAnchor
          component={NextLink}
          label="통계"
          icon={<IcRoundSettingsIcon />}
          href={`/studio/${channelUrl}/statistics/insights`}
        />

        <MiniNav.Tree.BranchAnchor
          component={NextLink}
          label="구독자"
          icon={<IcRoundSettingsIcon />}
          href={`/studio/${channelUrl}/subscribers`}
        />

        <MiniNav.Tree.BranchAnchor
          component={NextLink}
          label="설정"
          icon={<IcRoundSettingsIcon />}
          href={`/studio/${channelUrl}/setting`}
        />
      </MiniNav.Tree>
    </MiniNav>
  );
};
