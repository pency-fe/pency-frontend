import { getQueryClient } from "(route)/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { MeProvider, userKeys } from "_core/user";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(userKeys.me());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MeProvider>{children}</MeProvider>
    </HydrationBoundary>
  );
}
