"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import { WT_Post_Create_Form } from "_core/webtoon/post";

// ----------------------------------------------------------------------

export function PostIdPage() {
  const theme = useTheme();
  return (
    <>
      <Stack spacing={4} sx={{ backgroundColor: theme.vars.palette.background.paper, padding: 3, borderRadius: 2 }}>
        <Typography variant="h4">포스트 발행하기</Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Stack spacing={4}>
            <WT_Post_Create_Form.Title />
            <WT_Post_Create_Form.Genre />
            <Typography>미리보기</Typography>
            <Typography>에디터</Typography>
          </Stack>
        </form>
      </Stack>
    </>
  );
}
