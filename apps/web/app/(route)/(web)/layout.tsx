import { getQueryClient } from "(route)/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ky from "ky";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["post1"],
    queryFn: async () => {
      return await ky.get("https://jsonplaceholder.typicode.com/posts/1").json();
    },
  });
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
