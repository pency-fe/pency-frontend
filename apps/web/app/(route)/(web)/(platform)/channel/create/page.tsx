"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import { CH_Form } from "_core/channel/boundary/ch-form";

export default function Page() {
  const theme = useTheme();

  return (
    <Stack spacing={4}>
      <Typography variant="h4">새 채널 만들기</Typography>
      <form noValidate>
        <Stack spacing={3}>
          <CH_Form>
            <Box sx={{ backgroundColor: theme.vars.palette.background.paper, padding: 3, borderRadius: 2 }}>
              <Stack spacing={4}>
                <CH_Form.Title />
                <CH_Form.Description />
                <CH_Form.Url />
              </Stack>
            </Box>
            <CH_Form.CreateSubmitButton
              sx={{
                alignSelf: "flex-end",
              }}
            />
          </CH_Form>
        </Stack>
      </form>
    </Stack>
  );
}
