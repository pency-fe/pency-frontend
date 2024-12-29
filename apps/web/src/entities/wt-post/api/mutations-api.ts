import { apiClient } from "@/shared/lib/ky/api-client";

// ----------------------------------------------------------------------

type BookmarkReq = {
  id: number;
};

export const bookmark = async (req: BookmarkReq) => {
  return await apiClient.post(`webtoon/post/${req.id}/bookmark`).json();
};

// ----------------------------------------------------------------------

type UnbookmarkReq = {
  id: number;
};

export const unbookmark = async (req: UnbookmarkReq) => {
  return await apiClient.delete(`webtoon/post/${req.id}/bookmark`).json();
};
