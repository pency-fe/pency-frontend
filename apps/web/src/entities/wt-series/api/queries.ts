import { queryOptions } from "@tanstack/react-query";
import { getWebtoonSeriesPage } from "./queries-api";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";

export const wtSeriesKeys = {
  all: ["wt", "series"],
  pages: () => [...wtSeriesKeys.all, "page"],
  page: ({
    genre,
    sort,
    page,
    pair,
    creationType,
    seriesType,
    channelUrl,
  }: Parameters<typeof getWebtoonSeriesPage>[0] = {}) =>
    queryOptions<Awaited<ReturnType<typeof getWebtoonSeriesPage>>>({
      // [?]
      queryKey: [
        ...wtSeriesKeys.pages(),
        {
          genre,
          sort,
          page,
          pair,
          creationType,
          seriesType,
          channelUrl: channelUrl ? formatChannelUrl(channelUrl, { prefix: false }) : channelUrl,
        },
      ],
      queryFn: () => getWebtoonSeriesPage({ genre, sort, page, pair, creationType, seriesType, channelUrl }),
    }),
};
