import { getQueryClient } from "(route)/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { channelMeKeys, ChannelMeListProvider } from "_core/channel";
import { cookies } from "next/headers";
import { StudioLayout } from "./_layout/layout";
import { SelectedUserProfileProvider, userProfileMeKeys, UserProfileMeListProvider } from "_core/user-profile";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  // notfound

  // 권환이 없다.

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
            <StudioLayout>{children}</StudioLayout>
          </ChannelMeListProvider>
        </SelectedUserProfileProvider>
      </UserProfileMeListProvider>
    </HydrationBoundary>
  );
}
