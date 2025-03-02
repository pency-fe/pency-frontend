import { queryOptions } from "@tanstack/react-query";
import { getUserAuthMe } from "./api";
import { Options } from "ky";

// ----------------------------------------------------------------------
export const userKeys = {
  all: ["user"],
  lists: () => [...userKeys.all, "list"],
  details: () => [...userKeys.all, "detail"],
};

// ----------------------------------------------------------------------

export const userMeKeys = {
  all: ["userMe"],
  lists: () => [...userMeKeys.all, "list"],
  details: () => [...userMeKeys.all, "detail"],
};

// ----------------------------------------------------------------------

export const userAuthMeKeys = {
  all: ["userAuthMe"],
  lists: () => [...userAuthMeKeys.all, "list"],
  details: () => [...userAuthMeKeys.all, "detail"],
  detail: (options?: Options) =>
    queryOptions<Awaited<ReturnType<typeof getUserAuthMe>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...userAuthMeKeys.details()],
      queryFn: () => getUserAuthMe(options),
    }),
};
