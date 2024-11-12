import { queryOptions } from "@tanstack/react-query";
import { getMe } from "./api";

export const userKeys = {
  all: ["user"],
  me: () =>
    queryOptions<Awaited<ReturnType<typeof getMe>>>({
      queryKey: [...userKeys.all, "me"],
      queryFn: getMe,
    }),
};
