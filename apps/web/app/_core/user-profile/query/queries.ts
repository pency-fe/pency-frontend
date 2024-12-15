import { queryOptions } from "@tanstack/react-query";
import { getUserProfileMeList } from "./api";

export const userProfileMeKeys = {
  all: ["userProfileMe"],
  lists: () => [...userProfileMeKeys.all, "list"],
  list: () =>
    queryOptions<Awaited<ReturnType<typeof getUserProfileMeList>>>({
      queryKey: [...userProfileMeKeys.lists()],
      queryFn: () => getUserProfileMeList(),
    }),
};
