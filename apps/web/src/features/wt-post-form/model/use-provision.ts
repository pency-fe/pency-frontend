import { useMutation } from "@tanstack/react-query";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { provision } from "@/entities/wt-episode-me";

export const useProvision = () => {
  return useMutation<
    Awaited<ReturnType<typeof provision>>,
    | QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>
    | QueryError<FailureRes<409, "NO_SERIES">>
    | QueryError<FailureRes<401, "ACCESS_DENIED">>,
    Parameters<typeof provision>[0]
  >({
    mutationFn: provision,
  });
};
