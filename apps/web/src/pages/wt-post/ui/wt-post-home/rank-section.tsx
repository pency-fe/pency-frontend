"use client";

import { Box, Stack, Typography } from "@mui/material";
import { EvaHeartOutlineIcon, ListItemx, ListItemxCarousel, NineteenCircleIcon } from "@pency/ui/components";

export function RankSection() {
  const postData = {
    id: 123,
    thumbnail:
      "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1",
    age: "NINETEEN",
    title: "천재 궁수의 스트리밍",
    channel: {
      channelUrl: "dddddd",
      name: "김천재의 채널",
    },
    likeCount: 100,
  };

  return (
    <Stack spacing={1}>
      <ListItemxCarousel>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography variant="h4">포스트 랭킹</Typography>
          <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
            <ListItemxCarousel.PrevNav />
            <ListItemxCarousel.NextNav />
          </Box>
        </Box>

        <ListItemxCarousel.Container
          slots={{
            slides: (
              <>
                {Array.from({ length: 6 }, () => (
                  <ListItemxCarousel.Slide>
                    {Array.from({ length: 3 }, () => (
                      <ListItemx
                        slots={{
                          overlayElement: (
                            <ListItemx.OverlayAnchor
                              href={`/@${postData.channel.channelUrl}/webtoon/post/${postData.id}`}
                            />
                          ),
                          thumbnail: (
                            <ListItemx.Thumbnail
                              sx={{ aspectRatio: "16/9" }}
                              slots={{
                                image: <ListItemx.Thumbnail.Image src={postData.thumbnail} />,
                                topEnd: postData.age === "NINETEEN" ? <NineteenCircleIcon fontSize="small" /> : null,
                              }}
                            />
                          ),
                          order: (
                            <ListItemx.Order variant="soft" color="info">
                              1
                            </ListItemx.Order>
                          ),
                          title: <ListItemx.Title>{postData.title}</ListItemx.Title>,
                          attribute: (
                            <ListItemx.Attribute>
                              {postData.channel.name}
                              <ListItemx.Attribute.Dot />
                              <EvaHeartOutlineIcon />
                              {postData.likeCount}
                            </ListItemx.Attribute>
                          ),
                        }}
                      />
                    ))}
                  </ListItemxCarousel.Slide>
                ))}
              </>
            ),
          }}
        />
      </ListItemxCarousel>
    </Stack>
  );
}
