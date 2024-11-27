"use client";

import { useMutation } from "@tanstack/react-query";
import { webtoonPostPublish } from "./api";
import { FailureRes, QueryError } from "_core/api";

// ----------------------------------------------------------------------

export const useWebtoonPostPublish = () => {
  return useMutation<
    Awaited<ReturnType<typeof webtoonPostPublish>>,
    QueryError<FailureRes<409, "DUPLICATE_URL">>,
    Parameters<typeof webtoonPostPublish>[0]
  >({ mutationFn: webtoonPostPublish });
};
