"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout } from "./api";
import { FailureRes, QueryError } from "_core/api";
import { authUserKeys } from "./queries";

export const useLogin = () => {
  return useMutation<
    Awaited<ReturnType<typeof login>>,
    | QueryError<FailureRes<401, "INVALID_LOGIN">>
    | QueryError<FailureRes<401, "UNVERIFIED_EMAIL", { provisionUserId: string }>>,
    Parameters<typeof login>[0]
  >({
    mutationFn: login,
    meta: {
      invalidates: [[]],
      awaits: [authUserKeys.me().queryKey],
    },
  });
};

// ----------------------------------------------------------------------

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<Awaited<ReturnType<typeof logout>>, void, Parameters<typeof logout>>({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

// ----------------------------------------------------------------------
