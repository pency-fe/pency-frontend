"use client";

import { Button, List, ListItem, ListItemIcon, Stack, TextField } from "@mui/material";
import { BrandInstagramIcon, BrandTwitterIcon, FluentHome24RegularIcon } from "@pency/ui/components";
import { withAsyncBoundary } from "@pency/util";
import { useQuery } from "@tanstack/react-query";
import { channelMeKeys } from "_core/channel";
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
        <Stack spacing={3}>
          <List>
            <Stack spacing={2}>
              <ListItem disablePadding>
                <ListItemIcon>
                  <FluentHome24RegularIcon fontSize="medium" />
                </ListItemIcon>
                <TextField
                  variant="filled"
                  type="text"
                  fullWidth
                  label="홈"
                  placeholder="URL(http 포함)을 입력해 주세요."
                />
              </ListItem>

              <ListItem disablePadding>
                <ListItemIcon>
                  <BrandTwitterIcon fontSize="medium" />
                </ListItemIcon>
                <TextField
                  variant="filled"
                  type="text"
                  fullWidth
                  label="트위터(Twitter)"
                  placeholder="URL(http 포함)을 입력해 주세요."
                />
              </ListItem>

              <ListItem disablePadding>
                <ListItemIcon>
                  <BrandInstagramIcon fontSize="medium" />
                </ListItemIcon>
                <TextField
                  variant="filled"
                  type="text"
                  fullWidth
                  label="인스타그램(Instagram)"
                  placeholder="URL(http 포함)을 입력해 주세요."
                />
              </ListItem>
            </Stack>
          </List>

          <Button type="submit" variant="contained" color="primary" onClick={() => {}} sx={{ alignSelf: "flex-end" }}>
            변경 내용 저장
          </Button>
        </Stack>
      )}
    </>
  );
}

function Loading() {
  // [TODO]
  return <></>;
}
