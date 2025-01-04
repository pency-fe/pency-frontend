import { Genre, Status } from "@/shared/config/webtoon/const";
import { apiClient } from "@/shared/lib/ky/api-client";

// ----------------------------------------------------------------------

type CreateReq = {
  channelUrl: string;
  image?: string;
  status: Status;
  genre: Genre;
  title: string;
  description: string;
  keywords?: string[];
};

export const create = async (req: CreateReq) => {
  return await apiClient.post("webtoon/series/me", { json: req }).json();
};

// ----------------------------------------------------------------------

type UpdateReq = {
  id: number;
  image?: string;
  status: Status;
  genre: Genre;
  title: string;
  description: string;
  keywords?: string[];
};

export const update = async ({ id, ...rest }: UpdateReq) => {
  return await apiClient.post(`webtoon/series/me/${id}`, { json: rest }).json();
};

// ----------------------------------------------------------------------

type UpdateOrderReq = Array<number>;

export const updateOrder = async (req: UpdateOrderReq) => {
  return await apiClient.post(`webtoon/series/me/order`, { json: req }).json();
};

// ----------------------------------------------------------------------

type GetUploadImageUrlReq = {
  contentLength: number;
  contentType: "image/jpeg" | "image/png";
};

type GetUploadImageUrlRes = {
  signedUploadUrl: string;
  url: string;
};

export const getUploadImageUrl = async (req: GetUploadImageUrlReq) => {
  return await apiClient.post<GetUploadImageUrlRes>(`webtoon/series/me/image`, { json: req }).json();
};
