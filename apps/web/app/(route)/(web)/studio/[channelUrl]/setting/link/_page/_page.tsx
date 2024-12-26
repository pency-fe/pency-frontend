"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Stack, List, ListItem, Skeleton } from "@mui/material";
import { withAsyncBoundary } from "@pency/util";
import { useChannelUrlParam } from "_hooks";
import { CH_Link_Form, channelMeKeys } from "_core/channel";

// ----------------------------------------------------------------------
export const SettingLinkPage = withAsyncBoundary(SettingLinkPageFn, {
  errorBoundary: { fallback: <Loading /> },
  suspense: { fallback: <Loading /> },
});

function SettingLinkPageFn() {
  const url = useChannelUrlParam();
  const { data } = useSuspenseQuery({
    ...channelMeKeys.linkDetail({ url }),
    select: (data) => {
      return data.reduce(
        (acc, { linkType, url }) => {
          acc[linkType.toLowerCase() as Lowercase<typeof linkType>] = url;
          return acc;
        },
        {} as Record<Lowercase<(typeof data)[number]["linkType"]>, string>,
      );
    },
  });

  return (
    <CH_Link_Form home={data.home} twitter={data.twitter} instagram={data.instagram}>
      <Stack spacing={3}>
        <List>
          <Stack spacing={2}>
            <CH_Link_Form.Home />

            <CH_Link_Form.Twitter />

            <CH_Link_Form.Instagram />
          </Stack>
        </List>

        <CH_Link_Form.UpdateSubmit channelUrl={url} />
      </Stack>
    </CH_Link_Form>
  );
}

function Loading() {
  return (
    <Stack spacing={3}>
      <List>
        <Stack spacing={2}>
          <ListItem disablePadding>
            <Skeleton width="100%" height={54} />
          </ListItem>

          <ListItem disablePadding>
            <Skeleton width="100%" height={54} />
          </ListItem>

          <ListItem disablePadding>
            <Skeleton width="100%" height={54} />
          </ListItem>
        </Stack>
      </List>

      <Skeleton width={102} height={36} sx={{ alignSelf: "flex-end" }} />
    </Stack>
  );
}
