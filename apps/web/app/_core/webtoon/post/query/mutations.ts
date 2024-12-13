"use client";

import { useMutation } from "@tanstack/react-query";
import {
  webtoonPostBookmark,
  webtoonPostBookmarkDelete,
  webtoonPostLike,
  webtoonPostLikeDelete,
  webtoonPostPublish,
} from "./api";
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
    QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">> | QueryError<FailureRes<403, "SELF_FORBIDDEN">>,
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

// ----------------------------------------------------------------------

export const useWebtoonPostBookmark = () => {
  return useMutation<
    Awaited<ReturnType<typeof webtoonPostBookmark>>,
    QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">> | QueryError<FailureRes<403, "SELF_FORBIDDEN">>,
    Parameters<typeof webtoonPostBookmark>[0]
  >({ mutationFn: webtoonPostBookmark });
};

// ----------------------------------------------------------------------

export const useWebtoonPostBookmarkDelete = () => {
  return useMutation<
    Awaited<ReturnType<typeof webtoonPostBookmarkDelete>>,
    void,
    Parameters<typeof webtoonPostBookmarkDelete>[0]
  >({ mutationFn: webtoonPostBookmarkDelete });
};
