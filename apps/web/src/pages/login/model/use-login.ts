"use client";

import { useMutation } from "@tanstack/react-query";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { login } from "@/entities/@auth";

export const useLogin = () => {
  return useMutation<
    Awaited<ReturnType<typeof login>>,
    | QueryError<FailureRes<401, "INVALID_LOGIN">>
    | QueryError<FailureRes<401, "UNVERIFIED_EMAIL", { id: number }>>
    | QueryError<FailureRes<401, "BANNED_USER_BY_ADMIN">>,
    Parameters<typeof login>[0]
  >({
    mutationFn: login,
  });
};
