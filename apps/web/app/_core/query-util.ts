/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseQueryOptions } from "@tanstack/react-query";

export type PickQueryOptionsError<T extends UseQueryOptions<any, any, any, any>> =
  T extends UseQueryOptions<any, infer TError, any, any> ? TError : never;
