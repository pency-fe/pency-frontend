"use client";

import { useMutation } from "@tanstack/react-query";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { unbookmark } from "@/entities/wt-post";
import { useAuthContext } from "@/shared/auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "@pency/ui/components";

export const useUnbookmark = () => {
  const { mutate } = useMutation<
    Awaited<ReturnType<typeof unbookmark>>,
    QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>,
    Parameters<typeof unbookmark>[0]
  >({
    mutationFn: unbookmark,
  });
  const { isLoggedIn } = useAuthContext();
  const router = useRouter();

  return useCallback(
    (req: Parameters<typeof unbookmark>[0], onSuccess?: () => void) => {
      if (!isLoggedIn) {
        router.push("/login");
        return;
      }

      mutate(req, {
        onSuccess: () => {
          onSuccess?.();
          toast.success("북마크에서 제외했어요.");
        },
        onError: (error) => {
          if (error.code === "ALREADY_PROCESSED_REQUEST") {
            toast.error("이미 북마크에서 제외했어요.");
          }
        },
      });
    },
    [isLoggedIn, router, mutate],
  );
};
