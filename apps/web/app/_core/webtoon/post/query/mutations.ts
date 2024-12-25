"use client";

import { useMutation } from "@tanstack/react-query";
import { FailureRes, QueryError } from "_core/api";
import { bookmark, like, provision, publish, report, save, unbookmark, unlike } from "./api";

// ----------------------------------------------------------------------

export const usePublish = () => {
  return useMutation<
    Awaited<ReturnType<typeof publish>>,
    QueryError<FailureRes<404, "ENTITY_NOT_FOUND">> | QueryError<FailureRes<401, "ACCESS_DENIED">>,
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

// ----------------------------------------------------------------------

export const useReport = () => {
  return useMutation<Awaited<ReturnType<typeof report>>, void, Parameters<typeof report>[0]>({
    mutationFn: report,
  });
};

// ----------------------------------------------------------------------

export const useProvision = () => {
  return useMutation<
    Awaited<ReturnType<typeof provision>>,
    QueryError<FailureRes<404, "ENTITY_NOT_FOUND">> | QueryError<FailureRes<401, "ACCESS_DENIED">>,
    Parameters<typeof provision>[0]
  >({
    mutationFn: provision,
  });
};

// ----------------------------------------------------------------------

export const useSave = () => {
  return useMutation<
    Awaited<ReturnType<typeof save>>,
    | QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>
    | QueryError<FailureRes<403, "SAVED_POST_FORBIDDEN">>
    | QueryError<FailureRes<401, "ACCESS_DENIED">>,
    Parameters<typeof save>[0]
  >({
    mutationFn: save,
  });
};
