"use client";

import { Header } from "@pency/ui/layouts";
import { isClient, useFirstMountState } from "@pency/util";
import { useChannelMeListContext } from "_core/channel";
import { useUserAuthMeContext } from "_core/user";
import { redirect, useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export function StudioLayout({ children }: { children: React.ReactNode }) {
  const me = useUserAuthMeContext();
  const channelMe = me.isLoggedIn ? useChannelMeListContext() : [];
  const router = useRouter();
  const isFirstMount = useFirstMountState();
  const params = useParams();

  const channelUrl = useMemo(() => {}, [params]);

  console.log(channelUrl);

  if (isFirstMount && !me.isLoggedIn) {
    if (isClient()) {
      router.push("/login");
      return;
    } else {
      redirect("/login");
    }
  }

  // if (
  //   isFirstMount &&
  //   (channelMe.length === 0 || !channelMe.some((channel) => channel.url === decodeURIComponent(channelUrl as string)))
  // ) {
  //   if (isClient()) {
  //     // 권한이 없습니다.
  //     router.push("/");
  //     return;
  //   } else {
  //     // 권한이 없습니다.
  //     redirect("/");
  //   }
  // }

  return (
    <>
      <Header />
    </>
  );
}
