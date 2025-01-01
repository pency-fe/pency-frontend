"use client";

import { useParams } from "next/navigation";
import { Box, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { Header, Main } from "@pency/ui/layouts";
import { WT_Post_Form, wtPostMeKeys } from "_core/webtoon/post";
import HeaderLeft from "../../header-left";
import HeaderRight from "../../header-right";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useChannelUrlParam } from "_hooks";
import { withAsyncBoundary } from "@pency/util";

// ----------------------------------------------------------------------

export const PostIdPage = withAsyncBoundary(
  () => {
    const channelUrl = useChannelUrlParam();
    const { postId } = useParams<{ postId: string }>();

    const { data } = useSuspenseQuery({
      ...wtPostMeKeys.detail({ id: Number(postId) }),
      gcTime: 0,
    });

    const theme = useTheme();

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
            <Stack
              spacing={4}
              sx={{ backgroundColor: theme.vars.palette.background.paper, padding: 3, borderRadius: 2 }}
            >
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
  },
  {
    errorBoundary: {
      fallback: <Loading />,
    },
    suspense: {
      fallback: <Loading />,
    },
  },
);

function Loading() {
  const theme = useTheme();
  return (
    <>
      <Header
        slots={{
          left: <HeaderLeft />,
          right: (
            <Box sx={{ display: "flex", gap: "6px" }}>
              <Skeleton animation="wave" variant="circular" width={30} height={30} />
              <Skeleton animation="wave" width={64} height={30} />
            </Box>
          ),
        }}
      />
      <Main>
        <Stack spacing={4} sx={{ backgroundColor: theme.vars.palette.background.paper, padding: 3, borderRadius: 2 }}>
          <Typography variant="h4">웹툰 발행하기</Typography>
          <Stack spacing={4}>
            <Skeleton animation="wave" height={80} />
            <Skeleton animation="wave" height={56} />
            <Skeleton animation="wave" height={135} />
          </Stack>
        </Stack>
      </Main>
    </>
  );
}
