import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { userKeys } from "_core/user";
import { MeProvider } from "./me-provider";
import { cookies } from "next/headers";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(userKeys.me({ headers: { Cookie: cookies().toString() } }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MeProvider>{children}</MeProvider>
    </HydrationBoundary>
  );
}
