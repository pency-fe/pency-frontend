"use client";

import NextLink from "next/link";
import {
  FluentDrawImage24FilledIcon,
  FluentDrawText24FilledIcon,
  IcRoundSettingsIcon,
  MiniNav,
} from "@pency/ui/components";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";

export const StudioSidebarMiniNav = () => {
  const channelUrl = useChannelUrlParam();

  return (
    <MiniNav>
      <MiniNav.Tree>
        <MiniNav.Tree.Branch
          icon={<FluentDrawImage24FilledIcon />}
          label="웹툰"
          startsWith={`/studio/${channelUrl}/webtoon`}
        >
          <MiniNav.Tree.Branch.LeafAnchor
            component={NextLink}
            label="시리즈"
            href={`/studio/${channelUrl}/webtoon/series`}
          />
          <MiniNav.Tree.Branch.LeafAnchor
            component={NextLink}
            label="포스트"
            href={`/studio/${channelUrl}/webtoon/post/published`}
          />
        </MiniNav.Tree.Branch>

        {/* <MiniNav.Tree.Branch
          icon={<FluentDrawText24FilledIcon />}
          label="웹소설"
          startsWith={`/studio/${channelUrl}/webnovel`}
        >
          <MiniNav.Tree.Branch.LeafAnchor
            component={NextLink}
            label="시리즈"
            href={`/studio/${channelUrl}/webnovel/series`}
          />
          <MiniNav.Tree.Branch.LeafAnchor
            component={NextLink}
            label="포스트"
            href={`/studio/${channelUrl}/webnovel/post/published`}
          />
        </MiniNav.Tree.Branch> */}

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
