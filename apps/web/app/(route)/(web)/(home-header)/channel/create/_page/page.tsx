"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Main } from "@pency/ui/layouts";
import { CH_Create_Form, useChannelMeListContext } from "_core/channel";

export function CreatePage() {
  const theme = useTheme();
  const meChannel = useChannelMeListContext();

  return (
    <Main>
      <Stack spacing={4}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          noValidate
        >
          <Stack spacing={3}>
            {meChannel.length > 5 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 400,
                  color: theme.vars.palette.text.secondary,
                }}
              >
                <Typography variant="body2">새 채널을 개설할 수 없어요.</Typography>
                <Typography variant="body2">프로필당 채널을 최대 5개까지 개설할 수 있어요.</Typography>
              </Box>
            ) : (
              <CH_Create_Form>
                <Box sx={{ backgroundColor: theme.vars.palette.background.paper, padding: 3, borderRadius: 2 }}>
                  <Stack spacing={4}>
                    <Typography variant="h4">새 채널 만들기</Typography>
                    <CH_Create_Form.Title />
                    <CH_Create_Form.Description />
                    <CH_Create_Form.Url />
                    <CH_Create_Form.Image />
                  </Stack>
                </Box>
                <CH_Create_Form.CreateSubmitButton
                  sx={{
                    alignSelf: "flex-end",
                  }}
                />
              </CH_Create_Form>
            )}
          </Stack>
        </form>
      </Stack>
    </Main>
  );
}
