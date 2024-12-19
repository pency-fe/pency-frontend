"use client";

import { Stack, List, ListItem, Skeleton } from "@mui/material";
import { withAsyncBoundary } from "@pency/util";
import { useQuery } from "@tanstack/react-query";
import { CH_Link_Form, channelMeKeys } from "_core/channel";
import { useChannelUrlParam } from "_hooks";

// ----------------------------------------------------------------------
export const SettingLinkPage = withAsyncBoundary(SettingLinkPageFn, {
  errorBoundary: { fallback: <Loading /> },
});

function SettingLinkPageFn() {
  const url = useChannelUrlParam();
  const query = useQuery({ ...channelMeKeys.linkDetail({ url }), throwOnError: true });

  return (
    <>
      {query.isPending ? (
        <Loading />
      ) : (
        <CH_Link_Form>
          <Stack spacing={3}>
            <List>
              <Stack spacing={2}>
                <ListItem disablePadding>
                  <CH_Link_Form.Home />
                </ListItem>

                <ListItem disablePadding>
                  <CH_Link_Form.Twitter />
                </ListItem>

                <ListItem disablePadding>
                  <CH_Link_Form.Instagram />
                </ListItem>
              </Stack>
            </List>

            <CH_Link_Form.UpdateSubmit channelUrl={url} />
          </Stack>
        </CH_Link_Form>
      )}
    </>
  );
}

function Loading() {
  return (
    <Stack spacing={3}>
      <List>
        <Stack spacing={2}>
          <ListItem disablePadding>
            <Skeleton width={1152} height={54} />
          </ListItem>

          <ListItem disablePadding>
            <Skeleton width={1152} height={54} />
          </ListItem>

          <ListItem disablePadding>
            <Skeleton width={1152} height={54} />
          </ListItem>
        </Stack>
      </List>

      <Skeleton width={102} height={36} sx={{ alignSelf: "flex-end" }} />
    </Stack>
  );
}
