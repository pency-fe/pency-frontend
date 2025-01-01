"use client";

import { WtPostForm } from "@/features/wt-post-form";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";
import { Stack, Typography, useTheme } from "@mui/material";
import { useFirstMountState } from "@pency/util";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { HeaderLayout } from "./header-layout";
import { Main } from "@pency/ui/layouts";

export const WtPostEditorPage = () => {
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
    router.replace(`/editor/${formatChannelUrl(channelUrl)}/webtoon/${postId}`);
    return;
  }

  return (
    <WtPostForm channelUrl={channelUrl} id={postId} publish={false}>
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
