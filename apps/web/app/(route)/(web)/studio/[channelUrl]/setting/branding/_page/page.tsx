"use client";

import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { withAsyncBoundary } from "@pency/util";
import { useQuery } from "@tanstack/react-query";
import { CH_Update_Form, channelMeKeys } from "_core/channel";
import { useChannelUrlParam } from "_hooks";

// ----------------------------------------------------------------------

export const SettingBrandingPage = withAsyncBoundary(SettingBrandingPageFn, {
  errorBoundary: {
    fallback: <Loading />,
  },
});

// ----------------------------------------------------------------------

function SettingBrandingPageFn() {
  /**
   * useQuery 사용해서 channelMeKeys.brandingDetail 데이터를 가져와야 한다.
   *   ㄴ 대기: isPending => Loading 컴포넌트 구현
   *   ㄴ 실패: throwOnError
   *   ㄴ 성공
   * 가져온 데이터 CH_Update_Form로 넘겨준다.
   * 넘겨 받은 데이터를 ch-form.tsx 76번째 줄에 기본값으로 넣는다.
   * CH_Update_Form.DeleteButton 기능 구현
   * CH_Update_Form.UpdateSubmitButton 기능 구현
   *
   */

  const channelUrl = useChannelUrlParam();

  const query = useQuery({ ...channelMeKeys.brandingDetail({ url: channelUrl }), throwOnError: true });

  return (
    <>
      {query.isPending ? (
        <>
          <Loading />
        </>
      ) : (
        <Stack spacing={3}>
          <CH_Update_Form data={query.data!}>
            <Stack spacing={4}>
              <Typography variant="h4">채널 정보 수정</Typography>
              <CH_Update_Form.Title variant="filled" />
              <CH_Update_Form.Description variant="filled" />
              <CH_Update_Form.Url variant="filled" />
              <CH_Update_Form.Image />
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
              <CH_Update_Form.DeleteButton />
              <CH_Update_Form.UpdateSubmitButton />
            </Box>
          </CH_Update_Form>
        </Stack>
      )}
    </>
  );
}

function Loading() {
  return (
    <Stack spacing={3}>
      <Stack spacing={4}>
        <Skeleton animation="wave" height={36} width={140} />
        <Skeleton animation="wave" height={80} />
        <Skeleton animation="wave" height={118} />
        <Skeleton animation="wave" height={80} />
        <Skeleton animation="wave" height={128} width={320} />
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
          <Skeleton animation="wave" height={36} width={68} />
          <Skeleton animation="wave" height={36} width={104} />
        </Box>
      </Stack>
    </Stack>
  );
}
