"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { unblock } from "@/entities/channel";
import { useCallback } from "react";
import { toast } from "@pency/ui/components";
import { useAuthContext } from "@/entities/@auth";
import { useRouter } from "next/navigation";
import { useGenre } from "./genre-context";
import { useSort } from "./sort-context";
import { usePage } from "./page-context";
import { useCreationTypes } from "./creation-types-context";
import { usePairs } from "./pairs-context";
import { useChannelUrl } from "./channel-url-context";
import { wtPostKeys } from "@/entities/wt-post";
import { produce } from "immer";

export const useUnblock = () => {
  const { mutate } = useMutation<
    Awaited<ReturnType<typeof unblock>>,
    QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>,
    Parameters<typeof unblock>[0]
  >({
    mutationFn: unblock,
  });
  const { isLoggedIn } = useAuthContext();
  const { genre } = useGenre();
  const { sort } = useSort();
  const { page } = usePage();
  const { creationTypes } = useCreationTypes();
  const { pairs } = usePairs();
  const { channelUrl } = useChannelUrl();

  const queryClient = useQueryClient();
  const router = useRouter();

  return useCallback(
    (req: Parameters<typeof unblock>[0]) => {
      if (!isLoggedIn) {
        router.push("/login");
        return;
      }

      mutate(req, {
        onSuccess: () => {
          queryClient.setQueryData(
            wtPostKeys.page({ genre, sort, page, creationTypes, pairs, channelUrl }).queryKey,
            (oldData) =>
              oldData &&
              produce(oldData, (draft) => {
                for (const post of draft.posts) {
                  if (post.channel.id === req.id) {
                    post.block = false;
                  }
                }
              }),
          );
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
