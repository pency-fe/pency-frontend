import { RichCardCarousel } from "../../../components";
import { Meta } from "@storybook/react";
import { PostRichCard, SeriesRichCard } from "../card/rich-card.stories";

const meta: Meta = {
  title: "components/carousel/RichCardCarousel",
};

export default meta;

export const PostRichCardCarousel = () => {
  return (
    <RichCardCarousel>
      <RichCardCarousel.PrevNav />
      <RichCardCarousel.NextNav />

      <RichCardCarousel.Container
        slots={{
          slides: (
            <>
              {Array.from({ length: 10 }, (_, i) => (
                <RichCardCarousel.Slide key={i}>
                  <PostRichCard />
                </RichCardCarousel.Slide>
              ))}
            </>
          ),
        }}
      />
    </RichCardCarousel>
  );
};

// ----------------------------------------------------------------------

export const SeriesRichCardCarousel = () => {
  return (
    <RichCardCarousel>
      <RichCardCarousel.PrevNav />
      <RichCardCarousel.NextNav />

      <RichCardCarousel.Container
        slots={{
          slides: (
            <>
              {Array.from({ length: 10 }, (_, i) => (
                <RichCardCarousel.Slide key={i}>
                  <SeriesRichCard />
                </RichCardCarousel.Slide>
              ))}
            </>
          ),
        }}
      />
    </RichCardCarousel>
  );
};
