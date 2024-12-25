"use client";

import { Stack, Typography, useTheme } from "@mui/material";
import { Header, Main } from "@pency/ui/layouts";
import { WT_Post_Form } from "_core/webtoon/post";
import HeaderLeft from "./header-left";
import HeaderRight from "./header-right";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

// ----------------------------------------------------------------------

export function WebtoonLayout() {
  const { channelUrl } = useParams<{ channelUrl: string }>();
  const pathname = usePathname();
  const theme = useTheme();

  const postId = useMemo(() => {
    const arr = pathname.split("/");

    return isNaN(Number(arr[4])) ? undefined : Number(arr[4]);
  }, [pathname]);

  // [TODO] 포스트 아이디가 있을 경우, 그리고 첫 마운트인 경우 데이터를 가져와야 한다.
  return (
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
  );
}
