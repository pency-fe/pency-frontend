import { Iconify, Nav } from "@pency/ui/components";

export const navData: Parameters<typeof Nav>[0]["data"] = [
  {
    id: "platform",
    items: [
      {
        id: "webtoon",
        title: "웹툰",
        icon: <Iconify icon="fluent:draw-image-24-filled" />,
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
        icon: <Iconify icon="fluent:draw-text-24-filled" />,
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
