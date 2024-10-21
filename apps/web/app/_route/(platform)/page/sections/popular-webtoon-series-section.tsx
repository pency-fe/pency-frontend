import { OverviewCardCarousel } from "@pency/ui/components";
import { WT_Series_OverviewCard } from "_components/webtoon";

export function PopularWebtoonSeriesSection() {
  // API 작성
  return (
    <OverviewCardCarousel
      slots={{
        slides: (
          <>
            {Array.from({ length: 12 }, (_, i) => (
              <OverviewCardCarousel.Slide key={i}>
                <WT_Series_OverviewCard
                  data={{
                    seriesId: "series-id-123",
                    thumbnail:
                      "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
                    genre: "ACTION",
                    completionState: "SERIALIZATION",
                    title: "천재 궁수의 스트리밍",
                    channel: {
                      channelId: "channel-id-123",
                      avatar: "https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png",
                      name: "김천재의 채널",
                    },
                  }}
                />
              </OverviewCardCarousel.Slide>
            ))}
          </>
        ),
        prevNav: <OverviewCardCarousel.PrevNav />,
        nextNav: <OverviewCardCarousel.NextNav />,
      }}
    />
  );
}
