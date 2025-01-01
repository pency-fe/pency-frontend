"use client";

import { signupWithEmail } from "@/entities/provision-user";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { useMutation } from "@tanstack/react-query";

export const useSignupWithEmail = () => {
  return useMutation<
    Awaited<ReturnType<typeof signupWithEmail>>,
    QueryError<FailureRes<409, "DUPLICATE_EMAIL">>,
    Parameters<typeof signupWithEmail>[0]
  >({
    mutationFn: signupWithEmail,
  });
};
