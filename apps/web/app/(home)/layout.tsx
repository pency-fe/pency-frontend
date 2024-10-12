"use client";

import { DashboardLayout, Data } from "@pency/ui/layouts";
import { Icon } from "@iconify/react";

const data: Data = [
  {
    subheader: "서브 헤더",
    items: [
      {
        title: "웹툰",
        icon: <Icon icon="fluent:draw-image-24-filled" width="100%" height="100%" style={{ marginTop: "-2px" }} />,
        href: "/dashboard",
      },
      {
        title: "웹소설",
        icon: <Icon icon="fluent:draw-text-24-filled" width="100%" height="100%" style={{ marginTop: "-2px" }} />,
        href: "/dashboard",
      },
    ],
  },
] as const;

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <DashboardLayout
      slots={{
        header: <DashboardLayout.Header slots={{ topArea: "헤더입니다." }}></DashboardLayout.Header>,
        sidebar: <DashboardLayout.Sidebar data={data} />,
      }}
    >
      {children}
    </DashboardLayout>
  );
}
