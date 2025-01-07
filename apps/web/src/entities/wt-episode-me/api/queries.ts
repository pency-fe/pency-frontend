import { queryOptions } from "@tanstack/react-query";
import { getWebtoonEpisodeMe } from "./queries-api";
import { Options } from "ky";

export const wtPostMeKeys = {
  all: ["wtPostMe"],
  details: () => [...wtPostMeKeys.all, "detail"],
  detail: ({ id }: Parameters<typeof getWebtoonEpisodeMe>[0], options?: Options) =>
    queryOptions<Awaited<ReturnType<typeof getWebtoonEpisodeMe>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...wtPostMeKeys.details(), { id }],
      queryFn: () => getWebtoonEpisodeMe({ id }, options),
    }),
};
