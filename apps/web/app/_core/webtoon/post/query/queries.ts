/* eslint-disable @tanstack/query/exhaustive-deps */
import { queryOptions } from "@tanstack/react-query";
import { getWebtoonPostMe, getWebtoonPostPage } from "./api";
import { formatUrl } from "@pency/util";
import { Options } from "ky";

// ----------------------------------------------------------------------

export const wtPostKeys = {
  all: ["wt", "post"],
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

export const wtPostMeKeys = {
  all: ["wt", "postMe"],
  details: () => [...wtPostMeKeys.all, "detail"],
  detail: ({ id }: Parameters<typeof getWebtoonPostMe>[0], options?: Options) =>
    queryOptions<Awaited<ReturnType<typeof getWebtoonPostMe>>>({
      queryKey: [...wtPostMeKeys.details(), { id }],
      queryFn: () => getWebtoonPostMe({ id }, options),
    }),
};
