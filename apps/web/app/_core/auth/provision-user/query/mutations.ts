"use client";

import { useMutation } from "@tanstack/react-query";
import { resend, signupForEmail, verify } from "./api";
import { FailureRes, QueryError } from "_core/api";
import { authUserKeys } from "_core/auth/user";

export const useSignupForEmail = () => {
  return useMutation<
    Awaited<ReturnType<typeof signupForEmail>>,
    QueryError<FailureRes<409, "DUPLICATE_EMAIL">>,
    Parameters<typeof signupForEmail>[0]
  >({
    mutationFn: signupForEmail,
  });
};

// ----------------------------------------------------------------------

export const useResend = () => {
  return useMutation<
    Awaited<ReturnType<typeof resend>>,
    QueryError<FailureRes<401, "EXPIRED_EMAIL_TOKEN" | "EXCEEDED_EMAIL_SEND">>,
    Parameters<typeof resend>[0]
  >({
    mutationFn: resend,
  });
};

// ----------------------------------------------------------------------

export const useVerify = () => {
  return useMutation<
    Awaited<ReturnType<typeof verify>>,
    QueryError<FailureRes<401, "EXPIRED_EMAIL_TOKEN">>,
    Parameters<typeof verify>[0]
  >({
    mutationFn: verify,
    meta: {
      awaits: [authUserKeys.me().queryKey],
    },
  });
};

// ----------------------------------------------------------------------
