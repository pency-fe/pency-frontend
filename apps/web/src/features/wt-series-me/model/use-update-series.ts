"use client";

import { update, wtSeriesMeKeys } from "@/entities/wt-series-me";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdate = () => {
  const queryClient = useQueryClient();
  const channelUrl = useChannelUrlParam();

  return useMutation<
    Awaited<ReturnType<typeof update>>,
    QueryError<FailureRes<404, "ENTITY_NOT_FOUND">> | QueryError<FailureRes<401, "ACCESS_DENIED">>,
    Parameters<typeof update>[0]
  >({
    mutationFn: update,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: wtSeriesMeKeys.list({ channelUrl }).queryKey, exact: true });
    },
  });
};
