"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Stack, List, ListItem, Skeleton } from "@mui/material";
import { withAsyncBoundary } from "@pency/util";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";
import { channelMeKeys } from "@/entities/channel-me";
import { ChLinkForm } from "@/features/channel-me";

const StudioSettingLinkPageFn = () => {
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
    <ChLinkForm channelUrl={url} home={data.home} twitter={data.twitter} instagram={data.instagram}>
      <Stack spacing={3}>
        <List>
          <Stack spacing={2}>
            <ChLinkForm.Home />

            <ChLinkForm.Twitter />

            <ChLinkForm.Instagram />
          </Stack>
        </List>

        <ChLinkForm.UpdateSubmit sx={{ alignSelf: "flex-end" }} />
      </Stack>
    </ChLinkForm>
  );
};

// ----------------------------------------------------------------------

const Loading = () => {
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
};

// ----------------------------------------------------------------------

export const StudioSettingLinkPage = withAsyncBoundary(StudioSettingLinkPageFn, {
  errorBoundary: { fallback: <Loading /> },
  suspense: { fallback: <Loading /> },
});
