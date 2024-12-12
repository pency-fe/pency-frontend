import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { MeProvider } from "../../_core/user/provider/auth-me-provider";
import { cookies } from "next/headers";
import { authUserKeys } from "_core/user";
import { getQueryClient } from "(route)/get-query-client";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(authUserKeys.me({ headers: { Cookie: cookies().toString() } }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MeProvider>{children}</MeProvider>
    </HydrationBoundary>
  );
}
