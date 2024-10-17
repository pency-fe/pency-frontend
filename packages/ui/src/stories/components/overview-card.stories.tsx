import { Label, OverviewCard, Thumbnail } from "@/components";
import { Meta } from "@storybook/react";

const meta: Meta = {
  title: "components/OverviewCard",
};

export default meta;

export const Preview = () => {
  return (
    <OverviewCard
      slotProps={{
        thumbnail: {
          src: "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
          sx: { aspectRatio: "16/9" },
        },
        labels: [
          {
            color: "primary",
            children: "2차창작",
          },
          {
            color: "secondary",
            children: "BL",
          },
          {
            color: "warning",
            children: "액션",
          },
          {
            children: "연재",
          },
        ],
        profile: {
          avatar: {
            src: "https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png",
          },
          link: {
            href: "/channel/채널-아이디",
            children: "김천재의 채널",
          },
        },
      }}
      title="천재 궁수의 스트리밍"
    />
  );
};
