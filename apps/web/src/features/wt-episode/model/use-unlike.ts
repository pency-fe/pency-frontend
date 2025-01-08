// "use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { FailureRes, QueryError } from "@/shared/lib/ky/api-client";
// import { unlike, wtEpisodeKeys } from "@/entities/wt-episode";
// import { useAuthContext } from "@/entities/@auth";
// import { useRouter } from "next/navigation";
// import { toast } from "@pency/ui/components";
// import { produce } from "immer";

// export const useUnlike = () => {
//   const { mutate } = useMutation<
//     Awaited<ReturnType<typeof unlike>>,
//     QueryError<FailureRes<409, "ALREADY_PROCESSED_REQUEST">>,
//     Parameters<typeof unlike>[0]
//   >({
//     mutationFn: unlike,
//   });
//   const { isLoggedIn } = useAuthContext();

//   const queryClient = useQueryClient();
//   const router = useRouter();

//   return (req: Parameters<typeof unlike>[0]) => {
//     if (!isLoggedIn) {
//       router.push("/login");
//       return;
//     }

//     mutate(req, {
//       onSuccess: () => {
//         queryClient.setQueryData(
//           wtEpisodeKeys.page({ genre, sort, page, creationTypes, pairs, channelUrl }).queryKey,
//           (oldData) =>
//             oldData &&
//             produce(oldData, (draft) => {
//               draft.posts.find((post) => post.id === req.id)!.bookmark = false;
//             }),
//         );
//         toast.success("에피소드에 좋아요를 취소했어요.");
//       },
//       onError: (error) => {
//         if (error.code === "ALREADY_PROCESSED_REQUEST") {
//           toast.error("이미 좋아요 취소한 에피소드예요.");
//         }
//       },
//     });
//   };
// };
