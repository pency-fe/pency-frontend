import { queryOptions } from "@tanstack/react-query";
import { getChannelUserProfileList } from "./api";
import { Options } from "ky";

export const channelKeys = {
  all: ["channels"],
};

export const channelUserProfileKeys = {
  all: [...channelKeys.all, "user-profile"],
  lists: () => [...channelUserProfileKeys.all, "lists"],
  list: ({ id }: Required<Parameters<typeof getChannelUserProfileList>[0]>, options?: Options) =>
    queryOptions<Awaited<ReturnType<typeof getChannelUserProfileList>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...channelUserProfileKeys.lists(), { id }],
      queryFn: () => getChannelUserProfileList({ id }, options),
    }),
  detail: () => {},
};

export const channelStudioKeys = {};
