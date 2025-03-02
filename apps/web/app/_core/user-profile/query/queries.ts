import { Options } from "ky";
import { queryOptions } from "@tanstack/react-query";
import { getUserProfileMeList } from "./api";

export const userProfileMeKeys = {
  all: ["userProfileMe"],
  lists: () => [...userProfileMeKeys.all, "list"],
  list: (option?: Options) =>
    queryOptions<Awaited<ReturnType<typeof getUserProfileMeList>>>({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...userProfileMeKeys.lists()],
      queryFn: () => getUserProfileMeList(option),
    }),
};
