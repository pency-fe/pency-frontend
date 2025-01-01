"use client";

import { authKeys } from "@/entities/@auth";
import { verifyEmail } from "@/entities/provision-user";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { useMutation } from "@tanstack/react-query";

export const useVerifyEmail = () => {
  return useMutation<
    Awaited<ReturnType<typeof verifyEmail>>,
    QueryError<FailureRes<401, "EXPIRED_EMAIL_TOKEN">>,
    Parameters<typeof verifyEmail>[0]
  >({
    mutationFn: verifyEmail,
    meta: {
      awaits: [authKeys.detail().queryKey],
    },
  });
};
