import { useMutation } from "@tanstack/react-query";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { channelMeKeys, updateBranding } from "@/entities/channel-me";

export const useUpdateBranding = () => {
  return useMutation<
    Awaited<ReturnType<typeof updateBranding>>,
    QueryError<FailureRes<404, "ENTITY_NOT_FOUND">> | QueryError<FailureRes<409, "DUPLICATE_URL">>,
    Parameters<typeof updateBranding>[0]
  >({ mutationFn: updateBranding, meta: { invalidates: [channelMeKeys.list().queryKey] } });
};
