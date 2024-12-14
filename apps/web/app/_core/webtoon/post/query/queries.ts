import { queryOptions } from "@tanstack/react-query";
import { getWebtoonPostChannelPage, getWebtoonPostPage } from "./api";

// ----------------------------------------------------------------------

export const wtPostKeys = {
  all: ["wt", "posts"],
  pages: () => [...wtPostKeys.all, "page"],
  page: ({ genre, sort, page, creationTypes, pairs }: Parameters<typeof getWebtoonPostPage>[0] = {}) =>
    queryOptions<Awaited<ReturnType<typeof getWebtoonPostPage>>>({
      queryKey: [...wtPostKeys.pages(), { genre, sort, page, creationTypes, pairs }],
      queryFn: () => getWebtoonPostPage({ genre, sort, page, creationTypes, pairs }),
    }),
};

// ----------------------------------------------------------------------

export const wtPostChannelKeys = {
  all: [...wtPostKeys.all, "channel"],
  lists: () => [...wtPostChannelKeys.all, "list"],
  list: ({ url, sort, page }: Required<Parameters<typeof getWebtoonPostChannelPage>[0]>) =>
    queryOptions<Awaited<ReturnType<typeof getWebtoonPostChannelPage>>>({
      queryKey: [...wtPostChannelKeys.lists(), { url, sort, page }],
      queryFn: () => getWebtoonPostChannelPage({ url, page, sort }),
    }),
};
