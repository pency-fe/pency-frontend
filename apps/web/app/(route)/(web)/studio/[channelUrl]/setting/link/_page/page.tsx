"use client";

import { useQuery } from "@tanstack/react-query";
import { Stack, List, ListItem, Skeleton } from "@mui/material";
import { withAsyncBoundary } from "@pency/util";
import { useChannelUrlParam } from "_hooks";
import { CH_Link_Form, channelMeKeys } from "_core/channel";

// ----------------------------------------------------------------------
export const SettingLinkPage = withAsyncBoundary(SettingLinkPageFn, {
  errorBoundary: { fallback: <Loading /> },
});

function SettingLinkPageFn() {
  const url = useChannelUrlParam();
  // 대기, 성공, 실패 -> 상태(state) -> 바뀔 때마다 리렌더링이 발생해. (기본값)
  // 대기 -> 실패
  // - 에러를 발생시켜서 위에서 에러를 처리할거다~~ 에러를 처리할 수 있는 컴포넌트는 ErrorBoundary야. 만약에 ErrorBoundary가 없다면, 최상위까지 올라서 사이트 전체가 먹통이 된다. throwOnError: true
  // - 에러를 발생시키지 않고 지금 컴포넌트에서 에러를 처리할 거다. throwOnError: true가 없다는 거야. (throwOnError: undefined)
  // 에러 발생시키지 않았기 때문에 리렌더링이 발생해.
  // 내가 항상 정답을 알려줘서 이렇게 된건가?
  // 꼼꼼하게 보고 -> 문법 모르는거 있으면 바로 공부하고 -> 실행 순서, 동작 과정 생각/공부/질문
  const { data, status } = useQuery({
    ...channelMeKeys.linkDetail({ url }),
    throwOnError: true,
    select: (data) => {
      return data.reduce(
        (acc, { linkType, url }) => {
          acc[linkType.toLowerCase() as Lowercase<typeof linkType>] = url;
          return acc;
        },
        {} as Record<Lowercase<(typeof data)[number]["linkType"]>, string>,
      );
    },
  });

  if (status !== "success") {
    return <Loading />;
  }

  return (
    <CH_Link_Form home={data.home} twitter={data.twitter} instagram={data.instagram}>
      <Stack spacing={3}>
        <List>
          <Stack spacing={2}>
            <CH_Link_Form.Home />

            <CH_Link_Form.Twitter />

            <CH_Link_Form.Instagram />
          </Stack>
        </List>

        <CH_Link_Form.UpdateSubmit channelUrl={url} />
      </Stack>
    </CH_Link_Form>
  );
}

function Loading() {
  return (
    <Stack spacing={3}>
      <List>
        <Stack spacing={2}>
          <ListItem disablePadding>
            <Skeleton height={54} />
          </ListItem>

          <ListItem disablePadding>
            <Skeleton height={54} />
          </ListItem>

          <ListItem disablePadding>
            <Skeleton height={54} />
          </ListItem>
        </Stack>
      </List>

      <Skeleton width={102} height={36} sx={{ alignSelf: "flex-end" }} />
    </Stack>
  );
}
