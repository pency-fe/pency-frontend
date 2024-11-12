import { queryOptions } from "@tanstack/react-query";
import { getMe } from "./api";
import { Options } from "ky";

export const userKeys = {
  all: ["user"],
  me: (options?: Options) =>
    queryOptions<Awaited<ReturnType<typeof getMe>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...userKeys.all, "me"],
      queryFn: () => getMe(options),
    }),
};
