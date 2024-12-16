import { HomeHeaderLayout } from "./_layout/layout";
import { getQueryClient } from "(route)/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { channelMeKeys, ChannelMeListProvider } from "_core/channel";
import { UserProfileMeListProvider } from "_core/user-profile/provider";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  if (cookies().get("pency-uupid")) {
    await queryClient.prefetchQuery(channelMeKeys.list({ headers: { Cookie: cookies().toString() } }));
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserProfileMeListProvider>
        <ChannelMeListProvider>
          <HomeHeaderLayout>{children}</HomeHeaderLayout>
        </ChannelMeListProvider>
      </UserProfileMeListProvider>
    </HydrationBoundary>
  );
}
