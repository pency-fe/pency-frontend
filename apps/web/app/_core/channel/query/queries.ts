import { Options } from "ky";
import { queryOptions } from "@tanstack/react-query";
import { getChannelMeBrandingDetail, getChannelMeLinkDetail, getChannelMeList, getChannelUserProfileList } from "./api";

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
  details: () => [...channelMeKeys.all, "detail"],
  brandingDetail: ({ url }: Required<Parameters<typeof getChannelMeBrandingDetail>[0]>) =>
    queryOptions<Awaited<ReturnType<typeof getChannelMeBrandingDetail>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...channelMeKeys.details(), "branding"],
      queryFn: () => getChannelMeBrandingDetail({ url }),
    }),
  linkDetail: ({ url }: Required<Parameters<typeof getChannelMeLinkDetail>[0]>) =>
    queryOptions<Awaited<ReturnType<typeof getChannelMeLinkDetail>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...channelMeKeys.details(), "link"],
      queryFn: () => getChannelMeLinkDetail({ url }),
    }),
};
