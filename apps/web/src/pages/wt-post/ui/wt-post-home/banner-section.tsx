"use client";

import { BannerCarousel } from "@pency/ui/components";

export function BannerSection() {
  return (
    <BannerCarousel>
      <BannerCarousel.Panel
        slots={{
          prevNav: <BannerCarousel.PrevNav />,
          nextNav: <BannerCarousel.NextNav />,
        }}
      >
        <BannerCarousel.Slide sx={{ aspectRatio: "16/9" }}>
          <BannerCarousel.Slide.Image src="https://dn-img-page.kakao.com/download/resource?kid=3eZM3/hAd4i5WCOL/Kv0g8ogCXYNHkh1bqZ2nC1&filename=th3" />
        </BannerCarousel.Slide>
        <BannerCarousel.Slide sx={{ aspectRatio: "16/9" }}>
          <BannerCarousel.Slide.Image src="https://dn-img-page.kakao.com/download/resource?kid=3eZM3/hAd4i5WCOL/Kv0g8ogCXYNHkh1bqZ2nC1&filename=th3" />
        </BannerCarousel.Slide>
        <BannerCarousel.Slide sx={{ aspectRatio: "16/9" }}>
          <BannerCarousel.Slide.Image src="https://dn-img-page.kakao.com/download/resource?kid=3eZM3/hAd4i5WCOL/Kv0g8ogCXYNHkh1bqZ2nC1&filename=th3" />
        </BannerCarousel.Slide>
      </BannerCarousel.Panel>
    </BannerCarousel>
  );
}
