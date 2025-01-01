import { HomeSidebarLayout } from "./_layout/_layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeSidebarLayout>{children}</HomeSidebarLayout>;
}
