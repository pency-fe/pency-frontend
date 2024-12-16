"use client";

import { notFound } from "next/navigation";
import { Header, Sidebar, SidebarMain } from "@pency/ui/layouts";
import { useChannelMeListContext } from "_core/channel";
import { useUserAuthMeContext } from "_core/user";
import { useChannelUrlParam } from "_hooks";
import { AccessDenied } from "_views";
import { StudioSidebarNav } from "./studio-sidebar-nav";
import { StudioSidebarMiniNav } from "./studio-sidebar-mini-nav";

export function StudioLayout({ children }: { children: React.ReactNode }) {
  const me = useUserAuthMeContext();
  const channelMeList = me.isLoggedIn ? useChannelMeListContext() : [];
  const channelUrl = useChannelUrlParam();

  if (!channelUrl.startsWith("@")) {
    notFound();
  }

  // 프로필 포스타입처럼 만들고 싶어. (목표) -> 이부분을!!!!
  // 1. 문제가 뭔지를 모르는 상태로 해결하려고 해.

  // 문제를 잘 찾았어. 목표를 잘 찾았어. -> 설계 (제일 중요해...)
  // 문법의 문제를 찾은 다음에. -> 왜 문제인지 생각하고 ->
  // 그 이후에 코드를 어떻게 짤지 생각(머리 속으로 생각x) 적어!!
  // a4 용지 이틀에 한 번 꼴로 쓴다.

  // 현지는 항상 결과만 중요해....

  // 센스가 부족하고, 생각이 부족하다.
  // 키우기 위해서는 현지가 노력하는 수 밖에 없어. -> 현지의 모든 이상한 습관들 버리는거.
  //

  if (channelMeList.length === 0 || !channelMeList.some((channel) => channel.url === channelUrl.slice(1))) {
    return <AccessDenied />;
  }

  return (
    <>
      <Header />
      <Sidebar slots={{ nav: <StudioSidebarNav />, miniNav: <StudioSidebarMiniNav /> }} />
      <SidebarMain>{children}</SidebarMain>
    </>
  );
}
