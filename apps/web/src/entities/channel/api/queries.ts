import { queryOptions } from "@tanstack/react-query";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { getChannel } from "./queries-api";

export const channelKeys = {
  all: ["channel"],
  detail: ({ url }: Parameters<typeof getChannel>[0]) =>
    queryOptions<Awaited<ReturnType<typeof getChannel>>>({
      queryKey: [...channelKeys.all, { url: formatChannelUrl(url) }],
      queryFn: () => getChannel({ url }),
    }),
};
