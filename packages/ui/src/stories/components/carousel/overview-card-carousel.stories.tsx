import { OverviewCardCarousel } from "../../../components";
import { Meta } from "@storybook/react";
import { PostOverviewCard } from "../card/overview-card.stories";

const meta: Meta = {
  title: "components/carousel/OverviewCardCarousel",
};

export default meta;

export const Default = () => {
  return (
    <OverviewCardCarousel>
      <OverviewCardCarousel.PrevNav />
      <OverviewCardCarousel.NextNav />

      <OverviewCardCarousel.Panel>
        {Array.from({ length: 10 }, (_, i) => (
          <OverviewCardCarousel.Slide key={i}>
            <PostOverviewCard />
          </OverviewCardCarousel.Slide>
        ))}
      </OverviewCardCarousel.Panel>
    </OverviewCardCarousel>
  );
};
