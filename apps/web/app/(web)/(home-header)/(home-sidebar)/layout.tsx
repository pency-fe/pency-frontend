import { HomeSidebarLayout, HomeSidebarMainLayout } from "@/widgets/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeSidebarLayout />
      <HomeSidebarMainLayout>{children}</HomeSidebarMainLayout>
    </>
  );
}
