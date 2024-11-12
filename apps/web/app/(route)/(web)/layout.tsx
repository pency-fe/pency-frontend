import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { MeProvider } from "./me-provider";
import { cookies } from "next/headers";
import { authUserKeys } from "_core/auth/user";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(authUserKeys.me({ headers: { Cookie: cookies().toString() } }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MeProvider>{children}</MeProvider>
    </HydrationBoundary>
  );
}
