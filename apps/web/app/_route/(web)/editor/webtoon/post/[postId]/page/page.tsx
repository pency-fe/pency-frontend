"use client";

import { Stack, Typography } from "@mui/material";
import { WT_Post_Create_Form } from "_core/webtoon/post";

// ----------------------------------------------------------------------

export function PostIdPage() {
  return (
    <Stack spacing={4}>
      <Typography variant="h4">포스트 발행하기</Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <WT_Post_Create_Form>
          <Stack spacing={4}>
            <WT_Post_Create_Form.Title />
            <Typography>미리보기</Typography>
            <Typography>에디터</Typography>
          </Stack>
        </WT_Post_Create_Form>
      </form>
    </Stack>
  );
}
