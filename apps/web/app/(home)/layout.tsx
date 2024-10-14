"use client";

import { DashboardLayout } from "@pency/ui/layouts";
import { navData } from "./config-nav-data";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <DashboardLayout
      slots={{
        header: <DashboardLayout.Header data={navData} />,
        sidebar: <DashboardLayout.Sidebar data={navData} />,
        footer: <>Footer</>,
      }}
    >
      {children}
    </DashboardLayout>
  );
}
