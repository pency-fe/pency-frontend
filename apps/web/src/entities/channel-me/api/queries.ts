import { Options } from "ky";
import { queryOptions } from "@tanstack/react-query";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { getChannelMeBrandingDetail, getChannelMeLinkDetail, getChannelMeList } from "./repository";

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
  brandingDetail: ({ url }: Parameters<typeof getChannelMeBrandingDetail>[0]) =>
    queryOptions<Awaited<ReturnType<typeof getChannelMeBrandingDetail>>>({
      queryKey: [...channelMeKeys.details(), "branding", { url: formatChannelUrl(url) }],
      queryFn: () => getChannelMeBrandingDetail({ url }),
    }),
  linkDetail: ({ url }: Parameters<typeof getChannelMeLinkDetail>[0]) =>
    queryOptions<Awaited<ReturnType<typeof getChannelMeLinkDetail>>>({
      queryKey: [...channelMeKeys.details(), "link", { url: formatChannelUrl(url) }],
      queryFn: () => getChannelMeLinkDetail({ url }),
    }),
};
