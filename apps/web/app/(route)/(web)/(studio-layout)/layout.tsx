import { getQueryClient } from "(route)/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { channelMeKeys, ChannelMeListProvider } from "_core/channel";
import { cookies } from "next/headers";
import { StudioLayout } from "./_layout/layout";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  if (cookies().has("pency-uupid")) {
    await queryClient.prefetchQuery(channelMeKeys.list({ headers: { Cookie: cookies().toString() } }));
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChannelMeListProvider>
        <StudioLayout>{children}</StudioLayout>
      </ChannelMeListProvider>
    </HydrationBoundary>
  );
}
