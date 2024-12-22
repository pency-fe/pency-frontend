"use client";

import { useMutation } from "@tanstack/react-query";
import { block, createChannel, subscribe, unblock, unsubscribe, updateLink } from "./api";
import { FailureRes, QueryError } from "_core/api";
import { channelMeKeys } from "./queries";

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

export const useBlock = () => {
  return useMutation<
    Awaited<ReturnType<typeof block>>,
    | QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>
    | QueryError<FailureRes<403, "SELF_FORBIDDEN">>
    | QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>,
    Parameters<typeof block>[0]
  >({ mutationFn: block });
};

// ----------------------------------------------------------------------

export const useUnblock = () => {
  return useMutation<
    Awaited<ReturnType<typeof unblock>>,
    QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>,
    Parameters<typeof unblock>[0]
  >({
    mutationFn: unblock,
  });
};

// ----------------------------------------------------------------------

export const useUpdateLink = () => {
  return useMutation<
    Awaited<ReturnType<typeof updateLink>>,
    QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>,
    Parameters<typeof updateLink>[0]
  >({
    mutationFn: updateLink,
  });
};

// ----------------------------------------------------------------------

export const useSubscribe = () => {
  return useMutation<
    Awaited<ReturnType<typeof subscribe>>,
    | QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>
    | QueryError<FailureRes<403, "SELF_FORBIDDEN">>
    | QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>,
    Parameters<typeof subscribe>[0]
  >({ mutationFn: subscribe });
};

// ----------------------------------------------------------------------

export const useUnSubscribe = () => {
  return useMutation<
    Awaited<ReturnType<typeof unsubscribe>>,
    QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>,
    Parameters<typeof unsubscribe>[0]
  >({ mutationFn: unsubscribe });
};
