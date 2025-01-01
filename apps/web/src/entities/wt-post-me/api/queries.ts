import { queryOptions } from "@tanstack/react-query";
import { getWebtoonPostMe } from "./queries-api";
import { Options } from "ky";

export const wtPostMeKeys = {
  all: ["wtPostMe"],
  details: () => [...wtPostMeKeys.all, "detail"],
  detail: ({ id }: Parameters<typeof getWebtoonPostMe>[0], options?: Options) =>
    queryOptions<Awaited<ReturnType<typeof getWebtoonPostMe>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...wtPostMeKeys.details(), { id }],
      queryFn: () => getWebtoonPostMe({ id }, options),
    }),
};
