"use client";

import { useMutation } from "@tanstack/react-query";
import { FailureRes, QueryError } from "_core/api";
import { bookmark, like, publish, unbookmark, unlike } from "./api";

// ----------------------------------------------------------------------

export const usePublish = () => {
  return useMutation<
    Awaited<ReturnType<typeof publish>>,
    QueryError<FailureRes<409, "DUPLICATE_URL">>,
    Parameters<typeof publish>[0]
  >({ mutationFn: publish });
};

// ----------------------------------------------------------------------

export const useLike = () => {
  return useMutation<
    Awaited<ReturnType<typeof like>>,
    | QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>
    | QueryError<FailureRes<403, "SELF_FORBIDDEN">>
    | QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>,
    Parameters<typeof like>[0]
  >({ mutationFn: like });
};

// ----------------------------------------------------------------------

export const useUnlike = () => {
  return useMutation<
    Awaited<ReturnType<typeof unlike>>,
    QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>,
    Parameters<typeof unlike>[0]
  >({ mutationFn: unlike });
};

// ----------------------------------------------------------------------

export const useBookmark = () => {
  return useMutation<
    Awaited<ReturnType<typeof bookmark>>,
    | QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>
    | QueryError<FailureRes<403, "SELF_FORBIDDEN">>
    | QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>,
    Parameters<typeof bookmark>[0]
  >({ mutationFn: bookmark });
};

// ----------------------------------------------------------------------

export const useUnbookmark = () => {
  return useMutation<
    Awaited<ReturnType<typeof unbookmark>>,
    QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>,
    Parameters<typeof unbookmark>[0]
  >({
    mutationFn: unbookmark,
  });
};
