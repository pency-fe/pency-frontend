/* eslint-disable @tanstack/query/exhaustive-deps */
import { queryOptions } from "@tanstack/react-query";
import { getWebtoonPostPage } from "./api";
import { formatUrl } from "@pency/util";

// ----------------------------------------------------------------------

export const wtPostKeys = {
  all: ["wt", "posts"],
  pages: () => [...wtPostKeys.all, "page"],
  page: ({ genre, sort, page, creationTypes, pairs, channelUrl }: Parameters<typeof getWebtoonPostPage>[0] = {}) =>
    queryOptions<Awaited<ReturnType<typeof getWebtoonPostPage>>>({
      queryKey: [
        ...wtPostKeys.pages(),
        {
          genre,
          sort,
          page,
          creationTypes,
          pairs,
          channelUrl: channelUrl ? formatUrl(channelUrl) : channelUrl,
        },
      ],
      queryFn: () => getWebtoonPostPage({ genre, sort, page, creationTypes, pairs, channelUrl }),
    }),
};

// ----------------------------------------------------------------------
