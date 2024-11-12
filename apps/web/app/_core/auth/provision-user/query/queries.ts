import { queryOptions } from "@tanstack/react-query";
import { email } from "./api";
import { FailureRes, QueryError } from "_core/api";

export const authProvisionUserKeys = {
  all: ["auth", "provisionUser"],
  email: (req: Parameters<typeof email>[0]) =>
    queryOptions<Awaited<ReturnType<typeof email>>, QueryError<FailureRes<401, "EXPIRED_EMAIL_TOKEN">>>({
      queryKey: [...authProvisionUserKeys.all, "email", req],
      queryFn: () => email(req),
      gcTime: 0,
    }),
};
