import { notFound } from "next/navigation";
import { PostIdPage } from "./_page/_page";

export default function Page({ params: { postId } }: { params: { postId: string } }) {
  if (!postId || isNaN(Number(postId))) {
    notFound();
  }

  return <PostIdPage />;
}
