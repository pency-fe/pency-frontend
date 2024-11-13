"use client";

import { useMutation } from "@tanstack/react-query";
import { channelCreate } from "./api";
import { FailureRes, QueryError } from "_core/api";

// ----------------------------------------------------------------------

export const useChannelCreate = () => {
  return useMutation<
    Awaited<ReturnType<typeof channelCreate>>,
    QueryError<FailureRes<409, "DUPLICATE_URL">>,
    Parameters<typeof channelCreate>[0]
  >({ mutationFn: channelCreate });
};

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
