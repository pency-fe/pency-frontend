import { queryOptions } from "@tanstack/react-query";
import { getWebtoonPostPage } from "./api";

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
