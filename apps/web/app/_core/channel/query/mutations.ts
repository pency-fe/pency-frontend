"use client";

import { useMutation } from "@tanstack/react-query";
import { block, createChannel, unblock } from "./api";
import { FailureRes, QueryError } from "_core/api";

// ----------------------------------------------------------------------

export const useCreateChannel = () => {
  return useMutation<
    Awaited<ReturnType<typeof createChannel>>,
    QueryError<FailureRes<409, "DUPLICATE_URL">>,
    Parameters<typeof createChannel>[0]
  >({ mutationFn: createChannel });
};

// ----------------------------------------------------------------------

export const useBlock = () => {
  return useMutation<
    Awaited<ReturnType<typeof block>>,
    QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">> | QueryError<FailureRes<409, "SELF_FORBIDDEN">>,
    Parameters<typeof block>[0]
  >({ mutationFn: block });
};

// ----------------------------------------------------------------------

export const useUnblock = () => {
  return useMutation<
    Awaited<ReturnType<typeof unblock>>,
    QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>,
    Parameters<typeof unblock>[0]
  >({ mutationFn: unblock });
};
