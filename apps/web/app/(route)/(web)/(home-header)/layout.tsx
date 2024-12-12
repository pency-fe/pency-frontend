import { HomeHeaderLayout } from "./_layout/layout";
import { MeChannelProvider } from "./me-channel-provider";
import { channelMeKeys } from "_core/channel/query/queries";
import { getQueryClient } from "(route)/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(channelMeKeys.list({ headers: { Cookie: cookies().toString() } }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MeChannelProvider>
        <HomeHeaderLayout>{children}</HomeHeaderLayout>
      </MeChannelProvider>
    </HydrationBoundary>
  );
}
