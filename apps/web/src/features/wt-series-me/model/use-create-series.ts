"use client";

import { create, wtSeriesMeKeys } from "@/entities/wt-series-me";
import { useChannelUrlParam } from "@/shared/lib/hooks/use-channel-url-param";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreate = () => {
  const queryClient = useQueryClient();
  const channelUrl = useChannelUrlParam();

  return useMutation<
    Awaited<ReturnType<typeof create>>,
    | QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>
    | QueryError<FailureRes<401, "ACCESS_DENIED">>
    | QueryError<FailureRes<409, "EXCEEDED_WT_SERIES_CREATION">>,
    Parameters<typeof create>[0]
  >({
    mutationFn: create,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: wtSeriesMeKeys.list({ channelUrl }).queryKey, exact: true });
    },
  });
};
