import { queryOptions } from "@tanstack/react-query";
import { getProvisionUser } from "./queries-api";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";

export const provisionUserKeys = {
  all: ["provisionUser"],
  lists: () => [...provisionUserKeys.all, "list"],
  details: () => [...provisionUserKeys.all, "detail"],
  detail: (req: Parameters<typeof getProvisionUser>[0]) =>
    queryOptions<Awaited<ReturnType<typeof getProvisionUser>>, QueryError<FailureRes<401, "EXPIRED_EMAIL_TOKEN">>>({
      queryKey: [...provisionUserKeys.details(), req],
      queryFn: () => getProvisionUser(req),
      gcTime: 0,
    }),
};
