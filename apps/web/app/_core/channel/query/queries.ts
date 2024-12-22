/* eslint-disable @tanstack/query/exhaustive-deps */
import { Options } from "ky";
import { queryOptions } from "@tanstack/react-query";
import {
  getChannel,
  getChannelMeBrandingDetail,
  getChannelMeLinkDetail,
  getChannelMeList,
  getChannelUserProfileList,
  guardChannelMe,
} from "./api";
import { FailureRes, QueryError } from "_core/api";

export const channelKeys = {
  all: ["channel"],
  detail: ({ url }: Parameters<typeof getChannel>[0]) =>
    queryOptions<Awaited<ReturnType<typeof getChannel>>>({
      queryKey: [...channelKeys.all, { url }],
      queryFn: () => getChannel({ url }),
    }),
};

export const channelUserProfileKeys = {
  all: ["channelUserProfile"],
  lists: () => [...channelUserProfileKeys.all, "list"],
  list: ({ id }: Parameters<typeof getChannelUserProfileList>[0]) =>
    queryOptions<Awaited<ReturnType<typeof getChannelUserProfileList>>>({
      queryKey: [...channelUserProfileKeys.lists(), { id }],
      queryFn: () => getChannelUserProfileList({ id }),
    }),
};

export const channelMeKeys = {
  all: ["channelMe"],
  guard: ({ url }: Parameters<typeof guardChannelMe>[0], options?: Options) =>
    queryOptions<
      Awaited<ReturnType<typeof guardChannelMe>>,
      QueryError<FailureRes<404, "ENTITY_NOT_FOUND">> | QueryError<FailureRes<401, "ACCESS_DENIED">>
    >({
      queryKey: [...channelMeKeys.all, "guard", url],
      queryFn: () => guardChannelMe({ url }, options),
    }),
  lists: () => [...channelMeKeys.all, "list"],
  list: (options?: Options) =>
    queryOptions<Awaited<ReturnType<typeof getChannelMeList>>>({
      queryKey: [...channelMeKeys.lists()],
      queryFn: () => getChannelMeList(options),
    }),
  details: () => [...channelMeKeys.all, "detail"],
  brandingDetail: ({ url }: Parameters<typeof getChannelMeBrandingDetail>[0]) =>
    queryOptions<Awaited<ReturnType<typeof getChannelMeBrandingDetail>>>({
      queryKey: [...channelMeKeys.details(), "branding", url],
      queryFn: () => getChannelMeBrandingDetail({ url }),
    }),
  linkDetail: ({ url }: Parameters<typeof getChannelMeLinkDetail>[0]) =>
    queryOptions<Awaited<ReturnType<typeof getChannelMeLinkDetail>>>({
      queryKey: [...channelMeKeys.details(), "link", url],
      queryFn: () => getChannelMeLinkDetail({ url }),
    }),
};
