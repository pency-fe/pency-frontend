"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@pency/ui/components";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { useAuthContext } from "@/shared/auth";
import { subscribe } from "@/entities/channel";

export const useSubscribe = () => {
  const { mutate } = useMutation<
    Awaited<ReturnType<typeof subscribe>>,
    | QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>
    | QueryError<FailureRes<403, "SELF_FORBIDDEN">>
    | QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>,
    Parameters<typeof subscribe>[0]
  >({ mutationFn: subscribe });
  const { isLoggedIn } = useAuthContext();
  const router = useRouter();

  return useCallback(
    (req: Parameters<typeof subscribe>[0], onSuccess?: () => void) => {
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
            toast.error("이미 구독한 채널이에요..");
          }
          if (error.code === "SELF_FORBIDDEN") {
            toast.error("내 채널는 구독 할 수 없어요.");
          }
          if (error.code === "ENTITY_NOT_FOUND") {
            toast.error("삭제된 채널이에요.");
          }
        },
      });
    },
    [mutate, isLoggedIn, router],
  );
};
