import { queryOptions } from "@tanstack/react-query";
import { getMe } from "./api";
import { Options } from "ky";

// ----------------------------------------------------------------------

export const authUserKeys = {
  all: ["auth", "user"],
  me: (options?: Options) =>
    queryOptions<Awaited<ReturnType<typeof getMe>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...authUserKeys.all, "me"],
      queryFn: () => getMe(options),
    }),
};
