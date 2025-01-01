"use client";

import { useChannelMeListContext } from "@/entities/channel-me";
import { ChCreateForm } from "@/features/channel-me";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Main } from "@pency/ui/layouts";

export const ChannelCreatePage = () => {
  const theme = useTheme();
  const channelMe = useChannelMeListContext()!;

  return (
    <Main>
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
          <Typography variant="body2">채널은 최대 5개까지 개설할 수 있어요.</Typography>
        </Stack>
      ) : (
        <ChCreateForm>
          <Stack spacing={3}>
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
          </Stack>
        </ChCreateForm>
      )}
    </Main>
  );
};
