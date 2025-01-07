import { apiClient } from "@/shared/lib/ky/api-client";

// ----------------------------------------------------------------------

type LikeReq = {
  id: number;
};

export const like = async (req: LikeReq) => {
  return await apiClient.post(`webtoon/episode/${req.id}/like`).json();
};

// ----------------------------------------------------------------------

type UnlikeReq = {
  id: number;
};

export const unlike = async (req: UnlikeReq) => {
  return await apiClient.delete(`webtoon/episode/${req.id}/like`).json();
};
