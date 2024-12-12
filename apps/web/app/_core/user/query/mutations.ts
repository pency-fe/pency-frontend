"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout } from "./api";
import { FailureRes, QueryError } from "_core/api";
import { userAuthMeKeys } from "./queries";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Awaited<ReturnType<typeof login>>,
    | QueryError<FailureRes<401, "INVALID_LOGIN">>
    | QueryError<FailureRes<401, "UNVERIFIED_EMAIL", { id: number }>>
    | QueryError<FailureRes<401, "BANNED_USER_BY_ADMIN">>,
    Parameters<typeof login>[0]
  >({
    mutationFn: login,
    onSuccess: () => {
      queryClient.clear();
    },
    meta: {
      awaits: [userAuthMeKeys.detail().queryKey],
    },
  });
};

// ----------------------------------------------------------------------

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<Awaited<ReturnType<typeof logout>>, void, void>({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
