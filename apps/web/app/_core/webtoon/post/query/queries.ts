import { queryOptions } from "@tanstack/react-query";
import { getPostChannelList, getPostList } from "./api";

// ----------------------------------------------------------------------

export const wtPostKeys = {
  all: ["wt", "posts"],
  lists: () => [...wtPostKeys.all, "list"],
  list: ({ genre, sort, page }: Required<Parameters<typeof getPostList>[0]>) =>
    queryOptions<Awaited<ReturnType<typeof getPostList>>>({
      queryKey: [...wtPostKeys.lists(), { genre, sort, page }],
      queryFn: () => getPostList({ genre, sort, page }),
    }),
};

// ----------------------------------------------------------------------

export const wtPostChannelKeys = {
  all: [...wtPostKeys.all, "channel"],
  lists: () => [...wtPostChannelKeys.all, "list"],
  list: ({ channelUrl, sort, page }: Required<Parameters<typeof getPostChannelList>[0]>) =>
    queryOptions<Awaited<ReturnType<typeof getPostChannelList>>>({
      queryKey: [...wtPostChannelKeys.lists(), { channelUrl, sort, page }],
      queryFn: () => getPostChannelList({ channelUrl, page, sort }),
    }),
};
