"use client";

import { useMutation } from "@tanstack/react-query";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { unblock } from "@/entities/channel";
import { useCallback } from "react";
import { toast } from "@pency/ui/components";
import { useAuthContext } from "@/shared/auth";
import { useRouter } from "next/navigation";

export const useUnblock = () => {
  const { mutate } = useMutation<
    Awaited<ReturnType<typeof unblock>>,
    QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>,
    Parameters<typeof unblock>[0]
  >({
    mutationFn: unblock,
  });
  const { isLoggedIn } = useAuthContext();
  const router = useRouter();

  return useCallback(
    (req: Parameters<typeof unblock>[0], onSuccess?: () => void) => {
      if (!isLoggedIn) {
        router.push("/login");
        return;
      }

      mutate(req, {
        onSuccess: () => {
          onSuccess?.();
          toast.success("채널 차단을 해제했어요.");
        },
        onError: (error) => {
          if (error.code === "ALREADY_PROCESSED_REQUEST") {
            toast.error("이미 채널 차단을 해제했어요.");
          }
        },
      });
    },
    [isLoggedIn, router, mutate],
  );
};
