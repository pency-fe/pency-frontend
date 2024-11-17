import { ListItemxCarousel } from "@/components";
import { Meta } from "@storybook/react";
import { PostListItemx } from "../list/list-itemx.stories";

const meta: Meta = {
  title: "components/carousel/ListItemxCarousel",
};

export default meta;

export const Default = () => {
  return (
    <ListItemxCarousel>
      <ListItemxCarousel.PrevNav />
      <ListItemxCarousel.NextNav />

      <ListItemxCarousel.Container
        slots={{
          slides: (
            <>
              {/* 1 */}
              <ListItemxCarousel.Slide>
                <PostListItemx />
                <PostListItemx />
                <PostListItemx />
              </ListItemxCarousel.Slide>
              {/* 2 */}
              <ListItemxCarousel.Slide>
                <PostListItemx />
                <PostListItemx />
                <PostListItemx />
              </ListItemxCarousel.Slide>
              {/* 3 */}
              <ListItemxCarousel.Slide>
                <PostListItemx />
                <PostListItemx />
                <PostListItemx />
              </ListItemxCarousel.Slide>
              {/* 4 */}
              <ListItemxCarousel.Slide>
                <PostListItemx />
                <PostListItemx />
                <PostListItemx />
              </ListItemxCarousel.Slide>
              {/* 5 */}
              <ListItemxCarousel.Slide>
                <PostListItemx />
                <PostListItemx />
                <PostListItemx />
              </ListItemxCarousel.Slide>
              {/* 6 */}
              <ListItemxCarousel.Slide>
                <PostListItemx />
                <PostListItemx />
                <PostListItemx />
              </ListItemxCarousel.Slide>
            </>
          ),
        }}
      />
    </ListItemxCarousel>
  );
};
