"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { bookmark, wtPostKeys } from "@/entities/wt-post";
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

export const useBookmark = () => {
  const { mutate } = useMutation<
    Awaited<ReturnType<typeof bookmark>>,
    | QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>
    | QueryError<FailureRes<403, "SELF_FORBIDDEN">>
    | QueryError<FailureRes<404, "ENTITY_NOT_FOUND">>,
    Parameters<typeof bookmark>[0]
  >({ mutationFn: bookmark });
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
    (req: Parameters<typeof bookmark>[0]) => {
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
                draft.posts.find((post) => post.id === req.id)!.bookmark = true;
              }),
          );
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
    [isLoggedIn, router, mutate],
  );
};
