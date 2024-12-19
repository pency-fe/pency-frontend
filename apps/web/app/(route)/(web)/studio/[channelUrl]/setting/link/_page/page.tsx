"use client";

import { Button, List, ListItem, ListItemIcon, Stack, TextField } from "@mui/material";
import { BrandInstagramIcon, BrandTwitterIcon, FluentHome24RegularIcon } from "@pency/ui/components";
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
            {/* <List> */}
            <Stack spacing={2}>
              {/* <ListItem disablePadding> */}
              <CH_Link_Form.Home />
              {/* </ListItem> */}

              {/* <ListItem disablePadding> */}
              <CH_Link_Form.Twitter />
              {/* </ListItem> */}

              {/* <ListItem disablePadding> */}
              <CH_Link_Form.Instagram />
              {/* </ListItem> */}
            </Stack>
            {/* </List> */}

            <CH_Link_Form.UpdateSubmit channelUrl={url} />
          </Stack>
        </CH_Link_Form>
      )}
    </>
  );
}

function Loading() {
  // [TODO]
  return <></>;
}
