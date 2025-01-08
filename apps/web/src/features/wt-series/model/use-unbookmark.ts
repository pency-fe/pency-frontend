"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
import { useAuthContext } from "@/entities/@auth";
import { useRouter } from "next/navigation";
import { toast } from "@pency/ui/components";
import { useGenres } from "./genres-context";
import { useSort } from "./sort-context";
import { usePage } from "./page-context";
import { useCreationTypes } from "./creation-types-context";
import { usePairs } from "./pairs-context";
import { useChannelUrl } from "./channel-url-context";
import { produce } from "immer";
import { unbookmark, wtSeriesKeys } from "@/entities/wt-series";
import { useSeriesTypes } from "./series-types-context";
import { usePageType } from "./page-type-context";

export const useUnbookmark = () => {
  const { mutate } = useMutation<
    Awaited<ReturnType<typeof unbookmark>>,
    QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>,
    Parameters<typeof unbookmark>[0]
  >({
    mutationFn: unbookmark,
  });
  const { isLoggedIn } = useAuthContext();

  const { genres } = useGenres();
  const { creationTypes } = useCreationTypes();
  const { pairs } = usePairs();
  const { seriesTypes } = useSeriesTypes();
  const { page } = usePage();
  const { pageType } = usePageType();
  const { sort } = useSort();
  const { channelUrl } = useChannelUrl();

  const queryClient = useQueryClient();
  const router = useRouter();

  return (req: Parameters<typeof unbookmark>[0]) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    mutate(req, {
      onSuccess: () => {
        queryClient.setQueryData(
          wtSeriesKeys.page({ genres, creationTypes, pairs, seriesTypes, page, pageType, sort, channelUrl }).queryKey,
          (oldData) =>
            oldData &&
            produce(oldData, (draft) => {
              draft.serieses.find((series) => series.id === req.id)!.bookmark = false;
            }),
        );
        toast.success("북마크에서 제외했어요.");
      },
      onError: (error) => {
        if (error.code === "ALREADY_PROCESSED_REQUEST") {
          toast.error("이미 북마크에서 제외했어요.");
        }
      },
    });
  };
};
