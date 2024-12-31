import { Options } from "ky";
import { queryOptions } from "@tanstack/react-query";
import { getAuth } from "./queries-api";

export const authKeys = {
  all: ["auth"],
  details: () => [...authKeys.all, "detail"],
  detail: (options?: Options) =>
    queryOptions<Awaited<ReturnType<typeof getAuth>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...authKeys.details()],
      queryFn: () => getAuth(options),
    }),
};
