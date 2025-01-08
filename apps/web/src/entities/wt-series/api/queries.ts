import { queryOptions } from "@tanstack/react-query";
import { getWebtoonSeriesPage } from "./queries-api";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";

export const wtSeriesKeys = {
  all: ["wt", "series"],
  pages: () => [...wtSeriesKeys.all, "page"],
  page: ({
    genres = ["ALL"],
    creationTypes = ["ALL"],
    pairs = ["ALL"],
    seriesTypes = ["ALL"],
    page = 1,
    pageType = "DEFAULT",
    sort,
    channelUrl = undefined,
  }: Parameters<typeof getWebtoonSeriesPage>[0]) =>
    queryOptions<Awaited<ReturnType<typeof getWebtoonSeriesPage>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [
        ...wtSeriesKeys.pages(),
        {
          genres,
          creationTypes,
          pairs,
          seriesTypes,
          page,
          pageType,
          sort,
          channelUrl: channelUrl ? formatChannelUrl(channelUrl, { prefix: false }) : channelUrl,
        },
      ],
      queryFn: () =>
        getWebtoonSeriesPage({ genres, creationTypes, pairs, seriesTypes, page, pageType, sort, channelUrl }),
    }),
};
