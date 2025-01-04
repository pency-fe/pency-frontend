"use client";

import { useMutation } from "@tanstack/react-query";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { updateOrder } from "@/entities/wt-series-me";

export const useUpdateOrder = () => {
  return useMutation<
    Awaited<ReturnType<typeof updateOrder>>,
    QueryError<FailureRes<404, "ENTITY_NOT_FOUND"> | FailureRes<401, "ACCESS_DENIED">>,
    Parameters<typeof updateOrder>[0]
  >({ mutationFn: updateOrder });
};
