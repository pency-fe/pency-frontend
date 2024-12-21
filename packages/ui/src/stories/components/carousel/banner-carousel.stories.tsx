import { BannerCarousel } from "../../../components";
import { Meta } from "@storybook/react";

const meta: Meta = {
  title: "components/carousel/BannerCarousel",
};

export default meta;

export const Default = () => {
  return (
    <BannerCarousel
      slots={{
        slides: (
          <>
            <BannerCarousel.Slide
              slots={{
                image: (
                  <BannerCarousel.Slide.Image src="https://dn-img-page.kakao.com/download/resource?kid=3eZM3/hAd4i5WCOL/Kv0g8ogCXYNHkh1bqZ2nC1&filename=th3" />
                ),
              }}
              sx={{ aspectRatio: "16/9" }}
            />
            <BannerCarousel.Slide
              slots={{
                image: (
                  <BannerCarousel.Slide.Image src="https://dn-img-page.kakao.com/download/resource?kid=3eZM3/hAd4i5WCOL/Kv0g8ogCXYNHkh1bqZ2nC1&filename=th3" />
                ),
              }}
              sx={{ aspectRatio: "16/9" }}
            />
            <BannerCarousel.Slide
              slots={{
                image: (
                  <BannerCarousel.Slide.Image src="https://dn-img-page.kakao.com/download/resource?kid=3eZM3/hAd4i5WCOL/Kv0g8ogCXYNHkh1bqZ2nC1&filename=th3" />
                ),
              }}
              sx={{ aspectRatio: "16/9" }}
            />
          </>
        ),
        prevNav: <BannerCarousel.PrevNav />,
        nextNav: <BannerCarousel.NextNav />,
      }}
    />
  );
};
