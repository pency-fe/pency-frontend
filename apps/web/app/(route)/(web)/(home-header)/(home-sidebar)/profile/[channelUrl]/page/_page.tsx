"use client";

import { Avatar, Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { ListItemx } from "@pency/ui/components";

export default function ProfileChannelUrlPage() {
  const theme = useTheme();
  return (
    <Stack sx={{ alignItems: "center" }}>
      <Stack spacing={2} sx={{ alignItems: "center", py: 5 }}>
        <Avatar
          src={"https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png"}
          sx={{ width: 94, height: 94 }}
        />
        <Typography variant="h6">이현지</Typography>
        <Button variant="contained">프로필 수정</Button>
      </Stack>
      <Stack spacing={1.5} width={1}>
        <Box
          sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: theme.vars.palette.divider,
            borderRadius: 2,
            padding: 2,
          }}
        >
          <ListItemx
            slots={{
              overlayElement: <ListItemx.OverlayAnchor href={`/@dddddd`} />,
              thumbnail: (
                <ListItemx.Thumbnail
                  slots={{
                    image: (
                      <ListItemx.Thumbnail.Image
                        src={
                          "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1"
                        }
                      />
                    ),
                  }}
                  sx={{ aspectRatio: "1/1" }}
                />
              ),
              title: <ListItemx.Title variant="h6">dddddd</ListItemx.Title>,
              attribute: <ListItemx.Attribute variant="body2">구독자 0명</ListItemx.Attribute>,
              undereye: (
                <ListItemx.UnderEye>
                  dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                </ListItemx.UnderEye>
              ),
            }}
          />
        </Box>

        <Box
          sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: theme.vars.palette.divider,
            borderRadius: 2,
            padding: 2,
          }}
        >
          <ListItemx
            slots={{
              overlayElement: <ListItemx.OverlayAnchor href={`/@dddddd`} />,
              thumbnail: (
                <ListItemx.Thumbnail
                  slots={{
                    image: (
                      <ListItemx.Thumbnail.Image
                        src={
                          "https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1"
                        }
                      />
                    ),
                  }}
                  sx={{ aspectRatio: "1/1" }}
                />
              ),
              title: <ListItemx.Title variant="h6">dddddd</ListItemx.Title>,
              attribute: <ListItemx.Attribute variant="body2">구독자 0명</ListItemx.Attribute>,
            }}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
