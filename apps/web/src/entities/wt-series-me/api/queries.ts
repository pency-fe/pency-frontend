import { queryOptions } from "@tanstack/react-query";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { getWtSeriesMe, getWtSeriesMeList } from "./queries-api";

export const wtSeriesMeKeys = {
  all: ["wt", "series", "me"],
  lists: () => [...wtSeriesMeKeys.all, "list"],
  list: ({ channelUrl }: Parameters<typeof getWtSeriesMeList>[0]) =>
    queryOptions({
      queryKey: [
        ...wtSeriesMeKeys.lists(),
        {
          channelUrl: formatChannelUrl(channelUrl, { prefix: false }),
        },
      ],
      queryFn: () => getWtSeriesMeList({ channelUrl }),
    }),

  details: () => [...wtSeriesMeKeys.all, "detail"],
  detail: ({ id }: Parameters<typeof getWtSeriesMe>[0]) =>
    queryOptions({
      queryKey: [...wtSeriesMeKeys.details(), { id }],
      queryFn: () => getWtSeriesMe({ id }),
    }),
};
