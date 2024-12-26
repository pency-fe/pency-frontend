import { getQueryClient } from "(route)/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PostIdPage } from "./_page/_page";
import { wtPostMeKeys } from "_core/webtoon/post";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page({ params: { postId } }: { params: { postId: string } }) {
  const queryClient = getQueryClient();

  if (!postId || isNaN(Number(postId))) {
    notFound();
  }
  await queryClient.prefetchQuery(
    wtPostMeKeys.detail({ id: Number(postId) }, { headers: { Cookie: cookies().toString() } }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostIdPage />
    </HydrationBoundary>
  );
}
