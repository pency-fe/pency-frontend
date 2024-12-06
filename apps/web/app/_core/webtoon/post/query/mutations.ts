"use client";

import { useMutation } from "@tanstack/react-query";
import { webtoonPostLike, webtoonPostLikeDelete, webtoonPostPublish } from "./api";
import { FailureRes, QueryError } from "_core/api";

// ----------------------------------------------------------------------

export const useWebtoonPostPublish = () => {
  return useMutation<
    Awaited<ReturnType<typeof webtoonPostPublish>>,
    QueryError<FailureRes<409, "DUPLICATE_URL">>,
    Parameters<typeof webtoonPostPublish>[0]
  >({ mutationFn: webtoonPostPublish });
};

// ----------------------------------------------------------------------

export const useWebtoonPostLike = () => {
  return useMutation<
    Awaited<ReturnType<typeof webtoonPostLike>>,
    QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>,
    Parameters<typeof webtoonPostLike>[0]
  >({ mutationFn: webtoonPostLike });
};

// ----------------------------------------------------------------------

export const useWebtoonPostLikeDelete = () => {
  return useMutation<
    Awaited<ReturnType<typeof webtoonPostLikeDelete>>,
    void,
    Parameters<typeof webtoonPostLikeDelete>[0]
  >({ mutationFn: webtoonPostLikeDelete });
};
