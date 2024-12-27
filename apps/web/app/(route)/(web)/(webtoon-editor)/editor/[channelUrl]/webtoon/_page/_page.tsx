"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Stack, Typography, useTheme } from "@mui/material";
import { Header, Main } from "@pency/ui/layouts";
import { WT_Post_Form } from "_core/webtoon/post";
import HeaderLeft from "../header-left";
import HeaderRight from "../header-right";
import { useChannelUrlParam } from "_hooks";
import { formatUrl, useFirstMountState } from "@pency/util";

// ----------------------------------------------------------------------

export function WebtoonPage() {
  const channelUrl = useChannelUrlParam();
  const pathname = usePathname();
  const isFirstMount = useFirstMountState();
  const router = useRouter();
  const theme = useTheme();

  const postId = useMemo(() => {
    const arr = pathname.split("/");

    return isNaN(Number(arr[4])) ? undefined : Number(arr[4]);
  }, [pathname]);

  if (isFirstMount && postId) {
    router.replace(`/editor/${formatUrl(channelUrl)}/webtoon/${postId}`);
    return;
  }

  return (
    <>
      <WT_Post_Form channelUrl={channelUrl} id={postId} publish={false}>
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
