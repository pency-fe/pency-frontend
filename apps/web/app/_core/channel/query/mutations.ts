"use client";

import { useMutation } from "@tanstack/react-query";
import { block, createChannel, unblock } from "./api";
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
    /**
     * mutation 성공 시, UI의 channel me list 데이터가 DB의 데이터와 일치하지 않음
     * 새로운 데이터가 없어서 UI와 DB 데이터가 일치하지 않음
     *   ㄴ DB에서 새로운 데이터를 가져온다.
     *   ㄴ 직접 새로운 데이터를 생성한다.
     */
  });
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
  >({
    mutationFn: unblock,
  });
};
