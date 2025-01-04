"use client";

import { wtSeriesMeKeys } from "@/entities/wt-series-me";
import { WtSeriesOrderForm } from "@/features/wt-series-me";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";
import { Skeleton, Stack, Typography } from "@mui/material";
import { withAsyncBoundary } from "@pency/util";
import { useSuspenseQuery } from "@tanstack/react-query";

const SeriesOrderSectionFn = () => {
  const channelUrl = useChannelUrlParam();
  const { data } = useSuspenseQuery(wtSeriesMeKeys.list({ channelUrl }));

  return (
    <>
      {data.length ? (
        <Stack spacing={3}>
          <WtSeriesOrderForm series={data}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">시리즈 순서 설정</Typography>
              <WtSeriesOrderForm.Editor />
            </Stack>
            <WtSeriesOrderForm.SubmitButton sx={{ alignSelf: "flex-end" }} />
          </WtSeriesOrderForm>
        </Stack>
      ) : null}
    </>
  );
};

const Loading = () => {
  return (
    <Stack spacing={0.5}>
      <Skeleton height="60px" />
      <Skeleton height="60px" />
      <Skeleton height="60px" />
      <Skeleton height="60px" />
    </Stack>
  );
};

export const SeriesOrderSection = withAsyncBoundary(SeriesOrderSectionFn, {
  errorBoundary: { fallback: <Loading /> },
  suspense: { fallback: <Loading /> },
});
