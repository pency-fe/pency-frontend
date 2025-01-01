"use client";

import { channelMeKeys } from "@/entities/channel-me";
import { ChUpdateForm } from "@/features/channel-me";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";
import { Box, Skeleton, Stack } from "@mui/material";
import { withAsyncBoundary } from "@pency/util";
import { useSuspenseQuery } from "@tanstack/react-query";

// ----------------------------------------------------------------------

const StudioSettingBrandingPageFn = () => {
  const channelUrl = useChannelUrlParam();

  const { data } = useSuspenseQuery(channelMeKeys.brandingDetail({ url: channelUrl }));

  return (
    <ChUpdateForm data={data} originChannelUrl={channelUrl}>
      <Stack spacing={3}>
        <Stack spacing={4}>
          <ChUpdateForm.Title variant="filled" />
          <ChUpdateForm.Description variant="filled" />
          <ChUpdateForm.Url variant="filled" />
          <ChUpdateForm.Image />
          <ChUpdateForm.BgImage />
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
          <ChUpdateForm.DeleteButton />
          <ChUpdateForm.UpdateSubmitButton />
        </Box>
      </Stack>
    </ChUpdateForm>
  );
};

const Loading = () => {
  return (
    <Stack spacing={3}>
      <Stack spacing={4}>
        <Skeleton animation="wave" height={80} />
        <Skeleton animation="wave" height={118} />
        <Skeleton animation="wave" height={80} />
        <Skeleton animation="wave" width={128} height={128} />
        <Skeleton animation="wave" sx={{ pt: "16.2%" }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
          <Skeleton animation="wave" width={68} height={36} />
          <Skeleton animation="wave" width={104} height={36} />
        </Box>
      </Stack>
    </Stack>
  );
};

// ----------------------------------------------------------------------

export const StudioSettingBrandingPage = withAsyncBoundary(StudioSettingBrandingPageFn, {
  errorBoundary: {
    fallback: <Loading />,
  },
  suspense: {
    fallback: <Loading />,
  },
});
