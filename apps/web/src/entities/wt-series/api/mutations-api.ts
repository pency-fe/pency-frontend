import { apiClient } from "@/shared/lib/ky/api-client";

// ----------------------------------------------------------------------

type BookmarkReq = {
  id: number;
};

export const bookmark = async ({ id }: BookmarkReq) => {
  return await apiClient.post(`webtoon/series/${id}/bookmark`).json();
};

// ----------------------------------------------------------------------

type UnbookmarkReq = {
  id: number;
};

export const unbookmark = async ({ id }: UnbookmarkReq) => {
  return await apiClient.delete(`webtoon/series/${id}/bookmark`).json();
};
