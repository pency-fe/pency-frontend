import { useMutation } from "@tanstack/react-query";
import { resend, signup, verify } from "./api";
import { FailureRes, QueryError } from "_core/api";

export const useSignup = () => {
  return useMutation<
    Awaited<ReturnType<typeof signup>>,
    QueryError<FailureRes<409, "DUPLICATE_EMAIL">>,
    Parameters<typeof signup>[0]
  >({
    mutationFn: signup,
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
  });
};

// ----------------------------------------------------------------------
