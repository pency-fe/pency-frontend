"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import { CH_Create_Form } from "_core/channel/boundary/ch-form";

// ----------------------------------------------------------------------

export function CreatePage() {
  const theme = useTheme();

  return (
    <Stack spacing={4}>
      <Typography variant="h4">새 채널 만들기</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        noValidate
      >
        <Stack spacing={3}>
          <CH_Create_Form>
            <Box sx={{ backgroundColor: theme.vars.palette.background.paper, padding: 3, borderRadius: 2 }}>
              <Stack spacing={4}>
                <CH_Create_Form.Title />
                <CH_Create_Form.Description />
                <CH_Create_Form.Url />
              </Stack>
            </Box>
            <CH_Create_Form.CreateSubmitButton
              sx={{
                alignSelf: "flex-end",
              }}
            />
          </CH_Create_Form>
        </Stack>
      </form>
    </Stack>
  );
}
