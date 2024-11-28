"use client";

import { Box, Button, IconButton, Link, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { EvaArrowIosForwardFillIcon, FluentShare24RegularIcon } from "@pency/ui/components";
import { maxLine } from "@pency/ui/util";
import NextLink from "next/link";

export default function ChannelUrlLayout() {
  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box>
      {/* 배경 */}
      <Box
        sx={{
          aspectRatio: "clamp(0px, calc(100% /(5)), 9999px)",
          [theme.breakpoints.up("xs")]: {
            height: "75px",
          },
          [theme.breakpoints.up("sm")]: {
            height: "152px",
          },
          [theme.breakpoints.up("lg")]: {
            height: "216px",
            borderRadius: 1.5,
          },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="https://page-images.kakaoentcdn.com/download/resource?kid=b2PvT7/hAFPPPhF6U/e8nt8ArmKwQnOwsMS6TTFk&filename=o1"
          sx={{ position: "absolute", width: 1, height: 1, objectFit: "cover" }}
        />
      </Box>
      {/* 정보 */}
      <Box
        sx={{
          [theme.breakpoints.up("xs")]: {
            padding: "16px 0 4px 0",
            gap: 1.5,
          },
          [theme.breakpoints.up("sm")]: {
            padding: "24px 0 8px 0",
            gap: 2,
          },
          display: "flex",
        }}
      >
        {/* 정보_프로필 */}
        <Box
          sx={{
            [theme.breakpoints.up("xs")]: {
              width: 68,
              minWidth: 68,
              height: 68,
              borderRadius: 1,
            },
            [theme.breakpoints.up("sm")]: {
              width: 96,
              minWidth: 96,
              height: 96,
              borderRadius: 1.5,
            },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src="https://d33pksfia2a94m.cloudfront.net/assets/img/avatar/avatar_blank.png"
            sx={{ position: "absolute", width: 1, height: 1, objectFit: "cover" }}
          />
        </Box>

        {/* 정보_세부 */}
        <Stack sx={{ display: "flex", maxWidth: "600px" }}>
          <Typography variant={isUpSm ? "h4" : "subtitle1"} sx={{ ...maxLine({ line: 1 }) }}>
            채널명 채널명 채널명 채널명 채널명 채널명 채널명 채널명 채널명
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontWeight: 400,
              color: theme.vars.palette.text.secondary,
            }}
          >
            <Link
              component={NextLink}
              href="TODO_프로필"
              variant={isUpSm ? "subtitle1" : "subtitle2"}
              color={theme.vars.palette.text.primary}
              maxWidth={isUpSm ? 160 : 80}
              sx={{ ...maxLine({ line: 1 }) }}
            >
              프로필명프로필명프로필명프로필명프로필명프로필명프로필명프로필명
            </Link>
            <Typography variant={isUpSm ? "body1" : "body2"}>구독자 8천명</Typography>
            <Typography variant={isUpSm ? "body1" : "body2"}>•</Typography>
            <Typography variant={isUpSm ? "body1" : "body2"}>포스트 1.1개</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "26px",
              color: theme.vars.palette.text.secondary,
              cursor: "pointer",
            }}
          >
            <Typography
              variant={isUpSm ? "body1" : "caption"}
              sx={{
                ...maxLine({ line: 1 }),
              }}
            >
              {/* 없을 경우, 채널 정보 */}
              ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
              ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ
            </Typography>
            <EvaArrowIosForwardFillIcon />
          </Box>
        </Stack>

        {/* 버튼 */}
        {isUpSm ? (
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, ml: "auto" }}>
            <Button variant="contained">구독</Button>
            <IconButton variant="soft" sx={{ borderRadius: 1 }}>
              <FluentShare24RegularIcon />
            </IconButton>
          </Box>
        ) : null}
      </Box>
      {/* 버튼 */}
      {isUpSm ? null : (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" fullWidth>
            구독
          </Button>
          <IconButton variant="soft" sx={{ borderRadius: 1 }}>
            <FluentShare24RegularIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
