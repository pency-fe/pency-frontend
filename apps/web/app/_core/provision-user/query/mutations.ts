"use client";

import { useMutation } from "@tanstack/react-query";
import { FailureRes, QueryError } from "_core/api";
import { resendEmail, signupWithEmail, verifyEmail } from "./api";
import { userAuthMeKeys } from "_core/user";

export const useSignupWithEmail = () => {
  return useMutation<
    Awaited<ReturnType<typeof signupWithEmail>>,
    QueryError<FailureRes<409, "DUPLICATE_EMAIL">>,
    Parameters<typeof signupWithEmail>[0]
  >({
    mutationFn: signupWithEmail,
  });
};

// ----------------------------------------------------------------------

export const useResendEmail = () => {
  return useMutation<
    Awaited<ReturnType<typeof resendEmail>>,
    QueryError<FailureRes<401, "EXPIRED_EMAIL_TOKEN" | "EXCEEDED_EMAIL_SEND">>,
    Parameters<typeof resendEmail>[0]
  >({
    mutationFn: resendEmail,
  });
};

// ----------------------------------------------------------------------

export const useVerifyEmail = () => {
  return useMutation<
    Awaited<ReturnType<typeof verifyEmail>>,
    QueryError<FailureRes<401, "EXPIRED_EMAIL_TOKEN">>,
    Parameters<typeof verifyEmail>[0]
  >({
    mutationFn: verifyEmail,
    meta: {
      awaits: [userAuthMeKeys.detail().queryKey],
    },
  });
};

// ----------------------------------------------------------------------
