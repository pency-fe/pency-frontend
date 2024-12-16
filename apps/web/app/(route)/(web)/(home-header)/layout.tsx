import { HomeHeaderLayout } from "./_layout/layout";
import { getQueryClient } from "(route)/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { channelMeKeys, ChannelMeListProvider } from "_core/channel";
import { SelectedUserProfileProvider, userProfileMeKeys, UserProfileMeListProvider } from "_core/user-profile";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  if (cookies().has("pency-uupid")) {
    await Promise.all([
      queryClient.prefetchQuery(channelMeKeys.list({ headers: { Cookie: cookies().toString() } })),
      queryClient.prefetchQuery(userProfileMeKeys.list({ headers: { Cookie: cookies().toString() } })),
    ]);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserProfileMeListProvider>
        <SelectedUserProfileProvider>
          <ChannelMeListProvider>
            <HomeHeaderLayout>{children}</HomeHeaderLayout>
          </ChannelMeListProvider>
        </SelectedUserProfileProvider>
      </UserProfileMeListProvider>
    </HydrationBoundary>
  );
}
