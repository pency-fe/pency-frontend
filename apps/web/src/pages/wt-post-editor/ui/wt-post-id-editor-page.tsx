"use client";

import { useParams, useRouter } from "next/navigation";
import { Box, IconButton, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { Header, Main } from "@pency/ui/layouts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { withAsyncBoundary } from "@pency/util";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";
import { wtPostMeKeys } from "@/entities/wt-post-me";
import { HeaderLayout } from "./header-layout";
import { WtPostForm } from "@/features/wt-post-form";
import { EvaArrowIosBackFillIcon } from "@pency/ui/components";

// ----------------------------------------------------------------------

const WtPostIdEditorPageFn = () => {
  const channelUrl = useChannelUrlParam();
  const { postId } = useParams<{ postId: string }>();
  const { data } = useSuspenseQuery({
    ...wtPostMeKeys.detail({ id: Number(postId) }),
    gcTime: 0,
  });
  const theme = useTheme();

  return (
    <WtPostForm {...data} id={Number(postId)} channelUrl={channelUrl}>
      <HeaderLayout />
      <Main>
        <Stack spacing={4} sx={{ backgroundColor: theme.vars.palette.background.paper, padding: 3, borderRadius: 2 }}>
          <Typography variant="h4">웹툰 발행하기</Typography>
          <Stack spacing={4}>
            <WtPostForm.Title />
            <WtPostForm.Genre />
            <WtPostForm.Editor />
          </Stack>
        </Stack>
      </Main>
    </WtPostForm>
  );
};

const Loading = () => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      <Header
        slots={{
          left: (
            <IconButton onClick={router.back}>
              <EvaArrowIosBackFillIcon />
            </IconButton>
          ),
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
};

export const WtPostIdEditorPage = withAsyncBoundary(WtPostIdEditorPageFn, {
  errorBoundary: {
    fallback: <Loading />,
  },
  suspense: {
    fallback: <Loading />,
  },
});
