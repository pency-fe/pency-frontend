"use client";

import { resendEmail } from "@/entities/provision-user";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { useMutation } from "@tanstack/react-query";

export const useResendEmail = () => {
  return useMutation<
    Awaited<ReturnType<typeof resendEmail>>,
    QueryError<FailureRes<401, "EXPIRED_EMAIL_TOKEN" | "EXCEEDED_EMAIL_SEND">>,
    Parameters<typeof resendEmail>[0]
  >({
    mutationFn: resendEmail,
  });
};
