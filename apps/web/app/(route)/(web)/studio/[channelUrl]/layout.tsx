import { cookies } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "(route)/get-query-client";
import { ChannelMeGuard, channelMeKeys, ChannelMeListProvider } from "_core/channel";
import { SelectedUserProfileMeProvider, userProfileMeKeys, UserProfileMeListProvider } from "_core/user-profile";
import { StudioLayout } from "./_layout/layout";

export default async function Layout({
  params,
  children,
}: {
  params: { channelUrl: string };
  children: React.ReactNode;
}) {
  console.log("layout");
  const queryClient = getQueryClient();

  if (cookies().has("pency-uupid")) {
    const options = { headers: { Cookie: cookies().toString() } };
    await Promise.all([
      queryClient.prefetchQuery(channelMeKeys.guard({ url: decodeURIComponent(params.channelUrl) }, options)),
      queryClient.prefetchQuery(channelMeKeys.list(options)),
      queryClient.prefetchQuery(userProfileMeKeys.list(options)),
    ]);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChannelMeGuard>
        <UserProfileMeListProvider>
          <SelectedUserProfileMeProvider>
            <ChannelMeListProvider>
              <StudioLayout>{children}</StudioLayout>
            </ChannelMeListProvider>
          </SelectedUserProfileMeProvider>
        </UserProfileMeListProvider>
      </ChannelMeGuard>
    </HydrationBoundary>
  );
}
