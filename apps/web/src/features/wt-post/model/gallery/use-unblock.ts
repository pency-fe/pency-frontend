import { useMutation } from "@tanstack/react-query";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { unblock } from "@/entities/channel";
import { useCallback } from "react";
import { toast } from "@pency/ui/components";
import { useUserAuthMeContext } from "@/shared/user-auth-me";
import { useRouter } from "next/navigation";

export const useUnblock = () => {
  const { mutate } = useMutation<
    Awaited<ReturnType<typeof unblock>>,
    QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>,
    Parameters<typeof unblock>[0]
  >({
    mutationFn: unblock,
  });
  const me = useUserAuthMeContext();
  const router = useRouter();

  return useCallback(
    (req: Parameters<typeof unblock>[0], onSuccess?: () => void) => {
      if (!me.isLoggedIn) {
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
    [me, router, mutate],
  );
};
