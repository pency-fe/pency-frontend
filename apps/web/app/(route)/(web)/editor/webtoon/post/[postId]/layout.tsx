import { PostIdLayout } from "@/_route/(web)/editor/webtoon/post/[postId]/layout";
import "@pency/ui/global.css";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <PostIdLayout>{children}</PostIdLayout>;
}
