"use client";

import NextLink from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { WtSeriesOrderForm } from "@/features/wt-series-me";

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

        <Stack spacing={3}>
          <WtSeriesOrderForm
            series={[
              { id: 2, image: null, title: "시리즈 제목1", postCount: 1 },
              { id: 1, image: null, title: "시리즈 제목2", postCount: 2 },
              { id: 3, image: null, title: "시리즈 제목3", postCount: 3 },
              { id: 4, image: null, title: "시리즈 제목4", postCount: 4 },
            ]}
          >
            <Stack spacing={1}>
              <Typography variant="subtitle2">시리즈 순서 설정</Typography>
              <WtSeriesOrderForm.Editor />
            </Stack>
            <WtSeriesOrderForm.SubmitButton sx={{ alignSelf: "flex-end" }} />
          </WtSeriesOrderForm>
        </Stack>
      </Stack>
    </>
  );
};

const WtSeriesOrderSection = () => {};
