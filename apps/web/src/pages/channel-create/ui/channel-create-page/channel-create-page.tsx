"use client";

import { useChannelMeListContext } from "@/entities/channel-me";
import { RequireUser } from "@/entities/@auth";
import { ChCreateForm } from "@/features/channel-me";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Main } from "@pency/ui/layouts";

function ChannelCreatePageFn() {
  const theme = useTheme();
  const channelMe = useChannelMeListContext()!;

  return (
    <Main>
      <Stack spacing={4}>
        <Stack spacing={3}>
          {channelMe.length >= 5 ? (
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
                height: 400,
                color: theme.vars.palette.text.secondary,
              }}
            >
              <Typography variant="body2">새 채널을 개설할 수 없어요.</Typography>
              <Typography variant="body2">프로필당 채널을 최대 5개까지 개설할 수 있어요.</Typography>
            </Stack>
          ) : (
            <ChCreateForm>
              <Box sx={{ backgroundColor: theme.vars.palette.background.paper, padding: 3, borderRadius: 2 }}>
                <Stack spacing={4}>
                  <Typography variant="h4">새 채널 만들기</Typography>
                  <ChCreateForm.Title />
                  <ChCreateForm.Description />
                  <ChCreateForm.Url />
                  <ChCreateForm.Image />
                </Stack>
              </Box>
              <ChCreateForm.CreateSubmitButton
                sx={{
                  alignSelf: "flex-end",
                }}
              />
            </ChCreateForm>
          )}
        </Stack>
      </Stack>
    </Main>
  );
}

export const ChannelCreatePage = () => {
  return (
    <RequireUser>
      <ChannelCreatePageFn />
    </RequireUser>
  );
};
