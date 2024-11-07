import { useMutation } from "@tanstack/react-query";
import { signup } from "./api";
import { FailureRes } from "_core/api";
import { HTTPError } from "ky";

export const useSignup = () => {
  return useMutation<
    Awaited<ReturnType<typeof signup>>,
    HTTPError<FailureRes<409, "DUPLICATE_EMAIL">>,
    Parameters<typeof signup>[0]
  >({
    mutationFn: (req: Parameters<typeof signup>[0]) => signup(req),
  });
};
