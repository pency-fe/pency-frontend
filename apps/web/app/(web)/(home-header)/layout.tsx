import { getQueryClient } from "@/app/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { channelMeKeys, ChannelMeListProvider } from "@/entities/channel-me";
import {
  SelectedUserProfileMeProvider,
  userProfileMeKeys,
  UserProfileMeListProvider,
} from "@/entities/user-profile-me";
import { HomeHeaderLayout } from "@/widgets/layout";

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
            <HomeHeaderLayout />
            {children}
          </ChannelMeListProvider>
        </SelectedUserProfileMeProvider>
      </UserProfileMeListProvider>
    </HydrationBoundary>
  );
}
