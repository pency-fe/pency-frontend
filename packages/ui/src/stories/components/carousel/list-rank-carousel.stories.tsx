import { ListRankCarousel } from "@/components";
import { Meta } from "@storybook/react";
import { PostListItemx } from "../list/list-itemx.stories";

const meta: Meta = {
  title: "components/carousel/ListRankCarousel",
};

export default meta;

export const Default = () => {
  return (
    <ListRankCarousel>
      <ListRankCarousel.PrevNav />
      <ListRankCarousel.NextNav />

      <ListRankCarousel.Container
        slots={{
          slides: (
            <>
              <ListRankCarousel.Slide>
                <PostListItemx />
              </ListRankCarousel.Slide>
            </>
          ),
        }}
      />
    </ListRankCarousel>
  );
};
