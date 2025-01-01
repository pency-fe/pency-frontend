import { cookies } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/app/lib/get-query-client";
import { channelMeKeys, ChannelMeListProvider } from "@/entities/channel-me";
import {
  SelectedUserProfileMeProvider,
  userProfileMeKeys,
  UserProfileMeListProvider,
} from "@/entities/user-profile-me";
import { StudioLayout } from "@/widgets/layout";

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
