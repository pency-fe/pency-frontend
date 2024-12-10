"use client";

import { useMutation } from "@tanstack/react-query";
import { createChannel } from "./api";
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
