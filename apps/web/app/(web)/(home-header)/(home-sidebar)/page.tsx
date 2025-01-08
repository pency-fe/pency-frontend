import { HomePage } from "@/pages/home";
import { redirect } from "next/navigation";

export default function Page() {
  redirect("/webtoon");

  return <HomePage />;
}
