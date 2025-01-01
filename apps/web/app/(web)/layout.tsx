import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { userAuthMeKeys, UserAuthMeProvider } from "_core/user";
import { getQueryClient } from "(route)/get-query-client";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(userAuthMeKeys.detail({ headers: { Cookie: cookies().toString() } }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserAuthMeProvider>{children}</UserAuthMeProvider>
    </HydrationBoundary>
  );
}
