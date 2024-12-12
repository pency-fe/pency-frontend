import { queryOptions } from "@tanstack/react-query";
import { getChannelMeList, getChannelUserProfileList } from "./api";
import { Options } from "ky";

export const channelKeys = {
  all: ["channels"],
};

// default
// 전체 채널 리스트
// 특정 프로필의 채널 리스트 + 대시보드를 위한 데이터 필요 없잖아.
// 독자 입장에서 채널 디테일

// studio의 단위는 채널.
// studio vs me
// 나의 프로필의 채널 리스트 + 대시보드를 위한 데이터 필요할 수 있잖아.
// 나의 프로필의 채널 디테일

export const channelUserProfileKeys = {
  all: [...channelKeys.all, "user-profile"],
  lists: () => [...channelUserProfileKeys.all, "lists"],
  list: ({ id }: Required<Parameters<typeof getChannelUserProfileList>[0]>) =>
    queryOptions<Awaited<ReturnType<typeof getChannelUserProfileList>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...channelUserProfileKeys.lists(), { id }],
      queryFn: () => getChannelUserProfileList({ id }),
    }),
  detail: () => {},
};

export const channelMeKeys = {
  all: [...channelKeys.all, "me"],
  lists: () => [...channelMeKeys.all, "lists"],
  list: (options?: Options) =>
    queryOptions<Awaited<ReturnType<typeof getChannelMeList>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...channelMeKeys.lists(), "me"],
      queryFn: () => getChannelMeList(options),
    }),
};

export const channelStudioKeys = {};
