import { getQueryClient } from "@/app/lib/get-query-client";
import { authKeys, AuthProvider } from "@/entities/@auth";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(authKeys.detail({ headers: { Cookie: cookies().toString() } }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AuthProvider>{children}</AuthProvider>
    </HydrationBoundary>
  );
}
