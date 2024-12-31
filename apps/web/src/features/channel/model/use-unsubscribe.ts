"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { useAuthContext } from "@/shared/auth";
import { unsubscribe } from "@/entities/channel";
import { toast } from "@pency/ui/components";

export const useUnsubscribe = () => {
  const { mutate } = useMutation<
    Awaited<ReturnType<typeof unsubscribe>>,
    QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>,
    Parameters<typeof unsubscribe>[0]
  >({ mutationFn: unsubscribe });

  const { isLoggedIn } = useAuthContext();
  const router = useRouter();

  return useCallback(
    (req: Parameters<typeof unsubscribe>[0], onSuccess?: () => void) => {
      if (!isLoggedIn) {
        router.push("/login");
        return;
      }

      mutate(req, {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: (error) => {
          if (error.code === "ALREADY_PROCESSED_REQUEST") {
            toast.error("이미 구독 취소한 채널이에요.");
          }
        },
      });
    },
    [mutate, isLoggedIn, router],
  );
};
