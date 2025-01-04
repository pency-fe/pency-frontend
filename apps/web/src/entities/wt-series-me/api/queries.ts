import { queryOptions } from "@tanstack/react-query";

export const wtSeriesMeKeys = {
  all: ["wt", "series", "me"],
  lists: () => [...wtSeriesMeKeys.all, "list"],
  list: () => queryOptions({}),
};
