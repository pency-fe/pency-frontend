import { queryOptions } from "@tanstack/react-query";
import { getChannelMeList, getChannelUserProfileList } from "./api";
import { Options } from "ky";

export const channelKeys = {
  all: ["channels"],
};

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
