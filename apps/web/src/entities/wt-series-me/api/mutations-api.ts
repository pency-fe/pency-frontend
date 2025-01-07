import { Age, CreationType, Genre, Pair, SeriesType } from "@/shared/config/webtoon/const";
import { apiClient } from "@/shared/lib/ky/api-client";

// ----------------------------------------------------------------------

type CreateReq = {
  channelUrl: string;
  thumbnail?: string;
  age: Age;
  creationType: CreationType;
  pair: Pair;
  genre: Genre;
  seriesType: SeriesType;
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
  thumbnail?: string;
  age: Age;
  creationType: CreationType;
  pair: Pair;
  genre: Genre;
  seriesType: SeriesType;
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

type GetUploadThumbnailUrlReq = {
  contentLength: number;
  contentType: "image/jpeg" | "image/png";
};

type GetUploadThumbnailUrlRes = {
  signedUploadUrl: string;
  url: string;
};

export const getUploadThumbnailUrl = async (req: GetUploadThumbnailUrlReq) => {
  return await apiClient.post<GetUploadThumbnailUrlRes>(`webtoon/series/me/image`, { json: req }).json();
};
