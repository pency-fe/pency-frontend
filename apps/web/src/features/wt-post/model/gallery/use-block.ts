import { useMutation } from "@tanstack/react-query";
import { toast } from "@pency/ui/components";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { block } from "@/entities/channel";
import { useCallback } from "react";
import { useUserAuthMeContext } from "@/shared/user-auth-me";
import { useRouter } from "next/navigation";

export const useBlock = () => {
  const { mutate } = useMutation<
    Awaited<ReturnType<typeof block>>,
    | QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>
    | QueryError<FailureRes<403, "SELF_FORBIDDEN">>
    | QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>,
    Parameters<typeof block>[0]
  >({ mutationFn: block });
  const me = useUserAuthMeContext();
  const router = useRouter();

  return useCallback(
    (req: Parameters<typeof block>[0], onSuccess?: () => void) => {
      if (!me.isLoggedIn) {
        router.push("/login");
        return;
      }

      mutate(req, {
        onSuccess: () => {
          onSuccess?.();
          toast.success("채널을 차단했어요.");
        },
        onError: (error) => {
          if (error.code === "ALREADY_PROCESSED_REQUEST") {
            toast.error("이미 채널을 차단했어요.");
          }

          if (error.code === "SELF_FORBIDDEN") {
            toast.error("자신의 채널은 차단할 수 없어요.");
          }

          if (error.code === "ENTITY_NOT_FOUND") {
            toast.error("삭제된 채널이에요.");
          }
        },
      });
    },
    [me, router, mutate],
  );
};
