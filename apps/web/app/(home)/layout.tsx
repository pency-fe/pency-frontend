"use client";

import { DashboardLayout } from "@pency/ui/layouts";
import { sidebarData } from "./config-sidebar-data";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <DashboardLayout
      slots={{
        header: <DashboardLayout.Header />,
        sidebar: <DashboardLayout.Sidebar data={sidebarData} />,
        footer: <>Footer</>,
      }}
    >
      {children}
    </DashboardLayout>
  );
}
