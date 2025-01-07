import { useMutation } from "@tanstack/react-query";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { save } from "@/entities/wt-episode-me";

export const useSave = () => {
  return useMutation<
    Awaited<ReturnType<typeof save>>,
    | QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>
    | QueryError<FailureRes<403, "SAVED_POST_FORBIDDEN">>
    | QueryError<FailureRes<401, "ACCESS_DENIED">>,
    Parameters<typeof save>[0]
  >({
    mutationFn: save,
  });
};
