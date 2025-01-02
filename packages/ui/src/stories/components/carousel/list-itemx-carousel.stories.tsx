import { EvaHeartOutlineIcon, ListItemx, ListItemxCarousel, NineteenCircleIcon } from "../../../components";
import { Meta } from "@storybook/react";
import { Box, Typography } from "@mui/material";

const meta: Meta = {
  title: "components/carousel/ListItemxCarousel",
};

export default meta;

export const Default = () => {
  return (
    <ListItemxCarousel>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="h5">포스트 랭킹</Typography>
        <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
          <ListItemxCarousel.PrevNav />
          <ListItemxCarousel.NextNav />
        </Box>
      </Box>

      <ListItemxCarousel.Panel>
        {Array.from({ length: 6 }, (_, i) => (
          <ListItemxCarousel.Slide key={i}>
            {Array.from({ length: 3 }, (_, j) => (
              <ListItemx
                key={j}
                slots={{
                  overlayElement: <ListItemx.OverlayAnchor href="/@channelUrl/webtoon/post/id" />,
                  thumbnail: (
                    <ListItemx.Thumbnail
                      sx={{ aspectRatio: "16/9" }}
                      slots={{
                        image: (
                          <ListItemx.Thumbnail.Image src="https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1" />
                        ),
                        topEnd: <NineteenCircleIcon fontSize="small" />,
                      }}
                    />
                  ),
                  order: (
                    <ListItemx.Order variant="soft" color="info">
                      1
                    </ListItemx.Order>
                  ),
                  title: <ListItemx.Title>천재 궁수의 스트리밍</ListItemx.Title>,
                  attribute: (
                    <ListItemx.Attribute>
                      김천재
                      <ListItemx.Attribute.Dot />
                      <EvaHeartOutlineIcon />0
                    </ListItemx.Attribute>
                  ),
                }}
              />
            ))}
          </ListItemxCarousel.Slide>
        ))}
      </ListItemxCarousel.Panel>
    </ListItemxCarousel>
  );
};
