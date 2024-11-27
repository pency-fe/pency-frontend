"use client";

import { Stack, Typography, useTheme } from "@mui/material";
import { Header, Main } from "@pency/ui/layouts";
import { WT_Post_Create_Form } from "_core/webtoon/post";
import HeaderLeft from "./header-left";
import HeaderRight from "./header-right";

// ----------------------------------------------------------------------

export function WebtoonPage() {
  const theme = useTheme();
  return (
    <WT_Post_Create_Form>
      <Header
        slots={{
          left: <HeaderLeft />,
          right: <HeaderRight />,
        }}
      />
      <Main>
        <Stack spacing={4} sx={{ backgroundColor: theme.vars.palette.background.paper, padding: 3, borderRadius: 2 }}>
          <Typography variant="h4">웹툰 발행하기</Typography>
          <Stack spacing={4}>
            <WT_Post_Create_Form.Title />
            <WT_Post_Create_Form.Genre />
            <WT_Post_Create_Form.Price />
            <WT_Post_Create_Form.Editor />
          </Stack>
        </Stack>
      </Main>
    </WT_Post_Create_Form>
  );
}
