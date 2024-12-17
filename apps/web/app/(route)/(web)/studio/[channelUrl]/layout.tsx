import { cookies } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "(route)/get-query-client";
import { channelMeKeys, ChannelMeListProvider } from "_core/channel";
import { SelectedUserProfileMeProvider, userProfileMeKeys, UserProfileMeListProvider } from "_core/user-profile";
import { StudioLayout } from "./_layout/layout";
import { AccessGuard } from "./access-guard";

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
        <SelectedUserProfileMeProvider>
          <ChannelMeListProvider>
            <AccessGuard>
              <StudioLayout>{children}</StudioLayout>
            </AccessGuard>
          </ChannelMeListProvider>
        </SelectedUserProfileMeProvider>
      </UserProfileMeListProvider>
    </HydrationBoundary>
  );
}
