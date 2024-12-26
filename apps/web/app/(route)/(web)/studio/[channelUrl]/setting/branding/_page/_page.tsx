"use client";

import { Box, Skeleton, Stack } from "@mui/material";
import { withAsyncBoundary } from "@pency/util";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CH_Update_Form, channelMeKeys } from "_core/channel";
import { useChannelUrlParam } from "_hooks";

// ----------------------------------------------------------------------

export const SettingBrandingPage = withAsyncBoundary(SettingBrandingPageFn, {
  errorBoundary: {
    fallback: <Loading />,
  },
  suspense: {
    fallback: <Loading />,
  },
});

// ----------------------------------------------------------------------

function SettingBrandingPageFn() {
  const channelUrl = useChannelUrlParam();

  const { data } = useSuspenseQuery(channelMeKeys.brandingDetail({ url: channelUrl }));

  return (
    <Stack spacing={3}>
      <CH_Update_Form data={data}>
        <Stack spacing={4}>
          <CH_Update_Form.Title variant="filled" />
          <CH_Update_Form.Description variant="filled" />
          <CH_Update_Form.Url variant="filled" />
          <CH_Update_Form.Image />
          <CH_Update_Form.BgImage />
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
          <CH_Update_Form.DeleteButton />
          <CH_Update_Form.UpdateSubmitButton originChannelUrl={channelUrl} />
        </Box>
      </CH_Update_Form>
    </Stack>
  );
}

function Loading() {
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
}
