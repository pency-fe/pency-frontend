"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { like, wtEpisodeKeys } from "@/entities/wt-episode";
import { useAuthContext } from "@/entities/@auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "@pency/ui/components";
import { useGenre } from "./genre-context";
import { useSort } from "./sort-context";
import { usePage } from "./page-context";
import { useCreationTypes } from "./creation-types-context";
import { usePairs } from "./pairs-context";
import { useChannelUrl } from "./channel-url-context";
import { produce } from "immer";

export const useLike = () => {
  const { mutate } = useMutation<
    Awaited<ReturnType<typeof like>>,
    | QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>
    | QueryError<FailureRes<403, "SELF_FORBIDDEN">>
    | QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>,
    Parameters<typeof like>[0]
  >({ mutationFn: like });
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
    (req: Parameters<typeof like>[0]) => {
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
                draft.episodes.find((episode) => episode.id === req.id)!.like = true;
              }),
          );
          toast.success("에피소드에 좋아요를 눌렀어요.");
        },
        onError: (error) => {
          if (error.code === "ALREADY_PROCESSED_REQUEST") {
            toast.error("이미 좋아요한 에피소드예요.");
          }

          if (error.code === "SELF_FORBIDDEN") {
            toast.error("내 에피소드는 좋아요를 할 수 없어요.");
          }

          if (error.code === "ENTITY_NOT_FOUND") {
            toast.error("삭제된 에피소드예요.");
          }
        },
      });
    },
    [isLoggedIn, router, mutate],
  );
};
