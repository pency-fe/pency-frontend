"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import { CH_Create_Form } from "_core/channel/boundary/ch-form";

export default function Page() {
  const theme = useTheme();
  return (
    <Stack spacing={4}>
      <Typography variant="h4">새 채널 만들기</Typography>
      <Box sx={{ backgroundColor: theme.vars.palette.background.paper, padding: 3, borderRadius: 2 }}>
        <form noValidate>
          <Stack spacing={4}>
            <CH_Create_Form>
              <CH_Create_Form.Title />
              <CH_Create_Form.Description />
              <CH_Create_Form.Url />
              <CH_Create_Form.SubmitButton />
            </CH_Create_Form>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}
