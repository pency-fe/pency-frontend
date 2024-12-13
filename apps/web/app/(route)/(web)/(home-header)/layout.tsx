import { HomeHeaderLayout } from "./_layout/layout";
import { channelMeKeys } from "_core/channel/query/queries";
import { getQueryClient } from "(route)/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { ChannelMeListProvider } from "_core/channel";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  if (cookies().get("pency-uupid")) {
    await queryClient.prefetchQuery(channelMeKeys.list({ headers: { Cookie: cookies().toString() } }));
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChannelMeListProvider>
        <HomeHeaderLayout>{children}</HomeHeaderLayout>
      </ChannelMeListProvider>
    </HydrationBoundary>
  );
}
