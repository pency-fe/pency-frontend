import { Options } from "ky";
import { queryOptions } from "@tanstack/react-query";
import { getUserAuthMe } from "./queries-api";

export const userAuthMeKeys = {
  all: ["userAuthMe"],
  details: () => [...userAuthMeKeys.all, "detail"],
  detail: (options?: Options) =>
    queryOptions<Awaited<ReturnType<typeof getUserAuthMe>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...userAuthMeKeys.details()],
      queryFn: () => getUserAuthMe(options),
    }),
};
