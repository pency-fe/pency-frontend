import { useMutation } from "@tanstack/react-query";
import { publish } from "@/entities/wt-episode-me";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";

export const usePublish = () => {
  return useMutation<
    Awaited<ReturnType<typeof publish>>,
    QueryError<FailureRes<404, "ENTITY_NOT_FOUND">> | QueryError<FailureRes<401, "ACCESS_DENIED">>,
    Parameters<typeof publish>[0]
  >({
    mutationFn: publish,
  });
};
