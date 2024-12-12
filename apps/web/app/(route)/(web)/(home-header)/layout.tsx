import { QueryClient } from "@tanstack/react-query";
import { HomeHeaderLayout } from "./_layout/layout";
import { MeChannelProvider } from "./me-channel-provider";
import { channelUserProfileKeys } from "_core/channel/query/queries";
import { cookies } from "next/headers";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    channelUserProfileKeys.list({ id: 1 }, { headers: { Cookie: cookies().toString() } }),
  );

  return (
    <MeChannelProvider>
      <HomeHeaderLayout>{children}</HomeHeaderLayout>
    </MeChannelProvider>
  );
}
