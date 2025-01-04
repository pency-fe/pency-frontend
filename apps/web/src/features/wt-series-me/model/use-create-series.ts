import { create } from "@/entities/wt-series-me";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { useMutation } from "@tanstack/react-query";

export const useCreate = () => {
  return useMutation<
    Awaited<ReturnType<typeof create>>,
    | QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>
    | QueryError<FailureRes<401, "ACCESS_DENIED">>
    | QueryError<FailureRes<409, "EXCEEDED_WT_SERIES_CREATION">>,
    Parameters<typeof create>[0]
  >({
    mutationFn: create,
  });
};
