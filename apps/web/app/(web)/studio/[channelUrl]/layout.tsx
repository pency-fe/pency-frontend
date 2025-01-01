import { cookies } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "(route)/get-query-client";
import { channelMeKeys, ChannelMeListProvider } from "_core/channel";
import { SelectedUserProfileMeProvider, userProfileMeKeys, UserProfileMeListProvider } from "_core/user-profile";
import { StudioLayout } from "./_layout/_layout";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  if (cookies().has("pency-uupid")) {
    const options = { headers: { Cookie: cookies().toString() } };
    await Promise.all([
      queryClient.prefetchQuery(channelMeKeys.list(options)),
      queryClient.prefetchQuery(userProfileMeKeys.list(options)),
    ]);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserProfileMeListProvider>
        <SelectedUserProfileMeProvider>
          <ChannelMeListProvider>
            <StudioLayout>{children}</StudioLayout>
          </ChannelMeListProvider>
        </SelectedUserProfileMeProvider>
      </UserProfileMeListProvider>
    </HydrationBoundary>
  );
}
