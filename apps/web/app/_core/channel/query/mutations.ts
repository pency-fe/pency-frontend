"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { block, createChannel, unblock } from "./api";
import { FailureRes, QueryError } from "_core/api";
import { channelMeKeys } from "./queries";

// ----------------------------------------------------------------------

export const useCreateChannel = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Awaited<ReturnType<typeof createChannel>>,
    QueryError<FailureRes<409, "DUPLICATE_URL">> | QueryError<FailureRes<409, "EXCEEDED_CHANNEL_CREATION">>,
    Parameters<typeof createChannel>[0]
  >({
    mutationFn: createChannel,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: channelMeKeys.list().queryKey });
    // },
    meta: {
      invalidates: [channelMeKeys.list().queryKey],
    },
    /**
     * 문제: mutation 성공 시, UI의 channel me list 데이터가 DB의 데이터와 일치하지 않음
     * 문제 발생 이유: 업데이트된 데이터가 없어서
     * 해결책1: DB에서 업데이트된 데이터를 가져온다. (invalidates) 행위들을 해야한다.
     * 장점: 간단하다.
     * 단점: 없다.
     * 해결책2: 직접 업데이트된 데이터를 생성한다. (setQueryData)
     * 장점: 없다.
     * 단점: 코드짜기 복잡한다. -> setQueryData로는 불가능해. channelId를 알 방법이 없어.
     *
     * channel me list 데이터를 가져올 동안 기다리꺼냐 기다리지 않을 꺼냐.
     * 기다릴 때: profile을 클릭했을 때 완벽한 내 채널들이 보인다.
     * 기다리지 않을 때: profile을 클릭했을 때 완벽한 내 채널들이 보이지 않을 수 있다.
     * 과연 사용자는 채널 만들고 바로 profile을 클릭할까??
     * -> 우리가 채널로 이동시켜주잖아. -> 스튜디오로 보통 들어가겠지.
     * 결론: 그러니까 나는 기다리지 않을거야!!
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
