import { queryOptions } from "@tanstack/react-query";
import { getChannelUserProfileList } from "./api";

export const channelKeys = {
  all: ["channels"],
};

export const channelUserProfileKeys = {
  all: [...channelKeys.all, "user-profile"],
  lists: () => [...channelUserProfileKeys.all, "lists"],
  list: ({ id }: Required<Parameters<typeof getChannelUserProfileList>[0]>) => {
    queryOptions<Awaited<ReturnType<typeof getChannelUserProfileList>>>({
      queryKey: [...channelUserProfileKeys.lists(), { id }],
      queryFn: () => getChannelUserProfileList({ id }),
    });
  },
  detail: () => {},
};

export const channelStudioKeys = {};
