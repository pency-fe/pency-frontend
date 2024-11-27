import { queryOptions } from "@tanstack/react-query";
import { getPostList } from "./api";

// ----------------------------------------------------------------------

export const wtPostKeys = {
  all: ["wt", "posts"],
  lists: () => [...wtPostKeys.all, "list"],
  list: ({ genre, sort, page }: Required<Parameters<typeof getPostList>[0]>) =>
    queryOptions<Awaited<ReturnType<typeof getPostList>>>({
      queryKey: [...wtPostKeys.lists(), { genre, sort, page }],
      queryFn: () => getPostList({ genre, sort, page }),
    }),
};
