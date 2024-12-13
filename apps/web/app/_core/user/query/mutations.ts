"use client";

import { useMutation } from "@tanstack/react-query";
import { login, logout } from "./api";
import { FailureRes, QueryError } from "_core/api";

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

// ----------------------------------------------------------------------

export const useLogout = () => {
  return useMutation<Awaited<ReturnType<typeof logout>>, void, void>({
    mutationFn: logout,
  });
};
