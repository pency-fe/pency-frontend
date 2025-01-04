"use client";

import NextLink from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { SeriesOrderSection } from "./series-order-section";

export const StudioWtSeriesPage = () => {
  const channelUrl = useChannelUrlParam();
  return (
    <>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h5" sx={{ mb: 1 }}>
            웹툰 포스트를 시리즈로 관리할 수 있어요
          </Typography>
          <Typography variant="body2">
            하나의 장르를 가진 단편·연재·완결 웹툰을 시리즈로 만들고 그 안에 웹툰 포스트를 채워나가 보세요.
          </Typography>
          <Typography variant="body2">시리즈를 삭제할 때 웹툰 포스트는 발행된 채로 남아 있어요.</Typography>
          <Button
            variant="soft"
            color="primary"
            size="medium"
            component={NextLink}
            href={`/studio/${formatChannelUrl(channelUrl)}/webtoon/series/create`}
            sx={{ mt: 2 }}
          >
            새 시리즈 만들기
          </Button>
        </Box>

        <SeriesOrderSection />
      </Stack>
    </>
  );
};
