"use client";

import { useMutation } from "@tanstack/react-query";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { channelMeKeys, createChannel } from "@/entities/channel-me";

export const useCreateChannel = () => {
  return useMutation<
    Awaited<ReturnType<typeof createChannel>>,
    QueryError<FailureRes<409, "DUPLICATE_URL">> | QueryError<FailureRes<409, "EXCEEDED_CHANNEL_CREATION">>,
    Parameters<typeof createChannel>[0]
  >({
    mutationFn: createChannel,
    meta: {
      invalidates: [channelMeKeys.list().queryKey],
    },
  });
};
