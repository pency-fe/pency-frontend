import { queryOptions } from "@tanstack/react-query";
import { getProvisionUser } from "./api";
import { FailureRes, QueryError } from "_core/api";

export const authProvisionUserKeys = {
  all: ["auth", "provisionUser"],
  details: () => [...authProvisionUserKeys.all, "details"],
  detail: (req: Parameters<typeof getProvisionUser>[0]) =>
    queryOptions<Awaited<ReturnType<typeof getProvisionUser>>, QueryError<FailureRes<401, "EXPIRED_EMAIL_TOKEN">>>({
      queryKey: [...authProvisionUserKeys.details(), req],
      queryFn: () => getProvisionUser(req),
      gcTime: 0,
    }),
};
