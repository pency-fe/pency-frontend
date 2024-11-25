import { HomeSidebarLayout } from "./_layout/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeSidebarLayout>{children}</HomeSidebarLayout>;
}
