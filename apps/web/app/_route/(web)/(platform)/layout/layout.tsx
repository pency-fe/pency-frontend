"use client";

import { DashboardLayout } from "@pency/ui/layouts";
import { Header } from "./header";
import { navData } from "./nav-data";
import { PlatformNav } from "./platform-nav";

type Props = {
  children: React.ReactNode;
};

export function PlatformLayout({ children }: Props) {
  return (
    <DashboardLayout
      slots={{
        header: <Header />,
        sidebar: (
          <DashboardLayout.Sidebar
            data={navData}
            slots={{
              nav: <PlatformNav />,
            }}
          />
        ),
        footer: <>Footer</>,
      }}
    >
      {children}
    </DashboardLayout>
  );
}
