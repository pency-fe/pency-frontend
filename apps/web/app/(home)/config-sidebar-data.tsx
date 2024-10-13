import { DashboardLayout } from "@pency/ui/layouts";
import { Icon } from "@iconify/react";

export const sidebarData: Parameters<typeof DashboardLayout.Sidebar>[0]["data"] = [
  {
    id: "platform",
    items: [
      {
        id: "webtoon",
        title: "웹툰",
        icon: <Icon icon="fluent:draw-image-24-filled" width="100%" height="100%" style={{ marginTop: "-2px" }} />,
        items: [
          {
            id: "series",
            title: "시리즈",
            href: "/webtoon/series",
          },
          {
            id: "post",
            title: "포스트",
            href: "/webtoon/post",
          },
        ],
      },
      {
        id: "webnovel",
        title: "웹소설",
        icon: <Icon icon="fluent:draw-text-24-filled" width="100%" height="100%" style={{ marginTop: "-2px" }} />,
        items: [
          {
            id: "series",
            title: "시리즈",
            href: "/webnovel/series",
          },
          {
            id: "post",
            title: "포스트",
            href: "/webnovel/post",
          },
        ],
      },
    ],
  },
] as const;
