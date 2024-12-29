import { useMutation } from "@tanstack/react-query";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { bookmark } from "@/entities/wt-post";
import { useUserAuthMeContext } from "@/shared/user-auth-me";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "@pency/ui/components";

export const useBookmark = () => {
  const { mutate } = useMutation<
    Awaited<ReturnType<typeof bookmark>>,
    | QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>
    | QueryError<FailureRes<403, "SELF_FORBIDDEN">>
    | QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>,
    Parameters<typeof bookmark>[0]
  >({ mutationFn: bookmark });
  const me = useUserAuthMeContext();
  const router = useRouter();

  return useCallback(
    (req: Parameters<typeof bookmark>[0], onSuccess?: () => void) => {
      mutate(req, {
        onSuccess: () => {
          onSuccess?.();
          toast.success("북마크에 추가했어요.");
        },
        onError: (error) => {
          if (error.code === "ALREADY_PROCESSED_REQUEST") {
            toast.error("이미 북마크에 추가했어요.");
          }

          if (error.code === "SELF_FORBIDDEN") {
            toast.error("자신의 포스트는 북마크할 수 없어요.");
          }

          if (error.code === "ENTITY_NOT_FOUND") {
            toast.error("삭제된 포스트예요.");
          }
        },
      });
    },
    [me, router, mutate],
  );
};
