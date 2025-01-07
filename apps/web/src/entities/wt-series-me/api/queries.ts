import { queryOptions } from "@tanstack/react-query";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { getWebtoonSeriesMe, getWebtoonSeriesMeList } from "./queries-api";

export const wtSeriesMeKeys = {
  all: ["wt", "series", "me"],
  lists: () => [...wtSeriesMeKeys.all, "list"],
  list: ({ channelUrl }: Parameters<typeof getWebtoonSeriesMeList>[0]) =>
    queryOptions({
      queryKey: [
        ...wtSeriesMeKeys.lists(),
        {
          channelUrl: formatChannelUrl(channelUrl, { prefix: false }),
        },
      ],
      queryFn: () => getWebtoonSeriesMeList({ channelUrl }),
    }),

  details: () => [...wtSeriesMeKeys.all, "detail"],
  detail: ({ id }: Parameters<typeof getWebtoonSeriesMe>[0]) =>
    queryOptions({
      queryKey: [...wtSeriesMeKeys.details(), { id }],
      queryFn: () => getWebtoonSeriesMe({ id }),
    }),
};
