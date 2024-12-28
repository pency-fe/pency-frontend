/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseQueryOptions } from "@tanstack/react-query";

/**
 * QueryOptions의 Data 타입을 추출할 수 있게 해주는 유틸 타입입니다.
 */
export type PickQueryOptionsData<T extends UseQueryOptions<any, any, any, any>> =
  T extends UseQueryOptions<infer TQueryFnData, any, any, any> ? TQueryFnData : never;

/**
 * QueryOptions의 Error 타입을 추출할 수 있게 해주는 유틸 타입입니다.
 */
export type PickQueryOptionsError<T extends UseQueryOptions<any, any, any, any>> =
  T extends UseQueryOptions<any, infer TError, any, any> ? TError : never;
