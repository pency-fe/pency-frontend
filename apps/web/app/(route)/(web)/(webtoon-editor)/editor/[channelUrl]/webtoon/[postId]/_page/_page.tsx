"use client";

import { useParams } from "next/navigation";
import { Stack, Typography, useTheme } from "@mui/material";
import { Header, Main } from "@pency/ui/layouts";
import { WT_Post_Form, wtPostMeKeys } from "_core/webtoon/post";
import HeaderLeft from "../../header-left";
import HeaderRight from "../../header-right";
import { useQuery } from "@tanstack/react-query";
import { useChannelUrlParam } from "_hooks";

// ----------------------------------------------------------------------

export function PostIdPage() {
  const channelUrl = useChannelUrlParam();
  const { postId } = useParams<{ postId: string }>();
  // [TODO] Loading으로 처리하기
  const { status, data } = useQuery({
    ...wtPostMeKeys.detail({ id: Number(postId) }),
    gcTime: 0,
  });
  const theme = useTheme();

  if (status !== "success") {
    return;
  }

  return (
    <>
      <WT_Post_Form {...data} id={Number(postId)} channelUrl={channelUrl}>
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
              <WT_Post_Form.Title />
              <WT_Post_Form.Genre />
              <WT_Post_Form.Editor />
            </Stack>
          </Stack>
        </Main>
      </WT_Post_Form>
    </>
  );
}
