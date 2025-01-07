"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@pency/ui/components";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { block } from "@/entities/channel";
import { useCallback } from "react";
import { useAuthContext } from "@/entities/@auth";
import { useRouter } from "next/navigation";
import { useGenre } from "./genre-context";
import { useSort } from "./sort-context";
import { usePage } from "./page-context";
import { useCreationTypes } from "./creation-types-context";
import { usePairs } from "./pairs-context";
import { useChannelUrl } from "./channel-url-context";
import { wtEpisodeKeys } from "@/entities/wt-episode";
import { produce } from "immer";

export const useBlock = () => {
  const { mutate } = useMutation<
    Awaited<ReturnType<typeof block>>,
    | QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>
    | QueryError<FailureRes<403, "SELF_FORBIDDEN">>
    | QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>,
    Parameters<typeof block>[0]
  >({ mutationFn: block });
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
    (req: Parameters<typeof block>[0]) => {
      if (!isLoggedIn) {
        router.push("/login");
        return;
      }

      mutate(req, {
        onSuccess: () => {
          queryClient.setQueryData(
            wtEpisodeKeys.page({ genre, sort, page, creationTypes, pairs, channelUrl }).queryKey,
            (oldData) =>
              oldData &&
              produce(oldData, (draft) => {
                for (const post of draft.posts) {
                  if (post.channel.id === req.id) {
                    post.block = true;
                  }
                }
              }),
          );
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
    [isLoggedIn, router, mutate],
  );
};
