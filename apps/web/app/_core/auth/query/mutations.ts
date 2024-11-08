import { useMutation } from "@tanstack/react-query";
import { login, logout, resend, signup, verify } from "./api";
import { FailureRes } from "_core/api";
import { HTTPError } from "ky";

export const useSignup = () => {
  return useMutation<
    Awaited<ReturnType<typeof signup>>,
    HTTPError<FailureRes<409, "DUPLICATE_EMAIL">>,
    Parameters<typeof signup>[0]
  >({
    mutationFn: signup,
  });
};

// ----------------------------------------------------------------------

export const useResend = () => {
  return useMutation<
    Awaited<ReturnType<typeof resend>>,
    HTTPError<FailureRes<401, "EXPIRED_EMAIL_TOKEN" | "EXCEEDED_EMAIL_SEND">>,
    Parameters<typeof resend>[0]
  >({
    mutationFn: resend,
  });
};

// ----------------------------------------------------------------------

export const useVerify = () => {
  return useMutation<
    Awaited<ReturnType<typeof verify>>,
    HTTPError<FailureRes<401, "EXPIRED_EMAIL_TOKEN">>,
    Parameters<typeof verify>[0]
  >({
    mutationFn: verify,
  });
};

// ----------------------------------------------------------------------

export const useLogin = () => {
  return useMutation<
    Awaited<ReturnType<typeof login>>,
    HTTPError<FailureRes<401, "INVALID_LOGIN" | "UNVERIFIED_EMAIL">>,
    Parameters<typeof login>[0]
  >({
    mutationFn: login,
  });
};

// ----------------------------------------------------------------------

// [?]
export const useLogout = () => {
  return useMutation<Awaited<ReturnType<typeof logout>>, unknown, Parameters<typeof logout>>({
    mutationFn: logout,
  });
};

// ----------------------------------------------------------------------
