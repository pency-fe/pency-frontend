import { Options } from "ky";
import { queryOptions } from "@tanstack/react-query";
import { getChannelMeList, getChannelUserProfileList } from "./api";

export const channelKeys = {
  all: ["channel"],
  // [TODO]
  // detail: /channel/{url}
};

export const channelUserProfileKeys = {
  all: ["channelUserProfile"],
  lists: () => [...channelUserProfileKeys.all, "list"],
  list: ({ id }: Required<Parameters<typeof getChannelUserProfileList>[0]>) =>
    queryOptions<Awaited<ReturnType<typeof getChannelUserProfileList>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...channelUserProfileKeys.lists(), { id }],
      queryFn: () => getChannelUserProfileList({ id }),
    }),
};

export const channelMeKeys = {
  all: ["channelMe"],
  lists: () => [...channelMeKeys.all, "list"],
  list: (options?: Options) =>
    queryOptions<Awaited<ReturnType<typeof getChannelMeList>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...channelMeKeys.lists()],
      queryFn: () => getChannelMeList(options),
    }),
};
