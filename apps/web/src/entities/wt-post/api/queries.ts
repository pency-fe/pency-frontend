import { queryOptions } from "@tanstack/react-query";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { getWebtoonPostPage } from "./queries-api";

export const wtPostKeys = {
  all: ["wt", "post"],
  pages: () => [...wtPostKeys.all, "page"],
  page: ({ genre, sort, page, creationTypes, pairs, channelUrl }: Parameters<typeof getWebtoonPostPage>[0] = {}) =>
    queryOptions<Awaited<ReturnType<typeof getWebtoonPostPage>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [
        ...wtPostKeys.pages(),
        {
          genre,
          sort,
          page,
          creationTypes,
          pairs,
          channelUrl: channelUrl ? formatChannelUrl(channelUrl) : channelUrl,
        },
      ],
      queryFn: () => getWebtoonPostPage({ genre, sort, page, creationTypes, pairs, channelUrl }),
    }),
};
