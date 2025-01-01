import { updateLink } from "@/entities/channel-me";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { useMutation } from "@tanstack/react-query";

export const useUpdateLink = () => {
  return useMutation<
    Awaited<ReturnType<typeof updateLink>>,
    QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>,
    Parameters<typeof updateLink>[0]
  >({
    mutationFn: updateLink,
  });
};
