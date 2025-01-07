import { Age } from "@/shared/config/webtoon/const";
import { apiClient } from "@/shared/lib/ky/api-client";

type ProvisionReq = {
  channelUrl: string;
};

type ProvisionRes = {
  id: number;
};

export const provision = async (req: ProvisionReq) => {
  return await apiClient.post<ProvisionRes>("webtoon/episode/me/provision", { json: req }).json();
};

// ----------------------------------------------------------------------

type SaveReq = {
  id: number;
  title: string;
  free?: Array<{
    name: string;
    src: string;
  }>;
  paid?: Array<{
    name: string;
    src: string;
  }>;
  price?: number;
};

export const save = async ({ id, ...rest }: SaveReq) => {
  return await apiClient
    .post(`webtoon/episode/me/${id}/save`, {
      json: rest,
    })
    .json();
};

// ----------------------------------------------------------------------

type GetUploadCutImageUrlReq = {
  contentLength: number;
  contentType: "image/jpeg" | "image/png" | "image/gif";
};

type GetUploadCutImageUrlRes = {
  signedUploadUrl: string;
  url: string;
};

export const getUploadCutImageUrl = async (req: GetUploadCutImageUrlReq) => {
  return await apiClient.post<GetUploadCutImageUrlRes>("webtoon/episode/me/cut-image", { json: req }).json();
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
  return await apiClient.post<GetUploadThumbnailUrlRes>("webtoon/episode/me/thumbnail", { json: req }).json();
};

// ----------------------------------------------------------------------

type PublishReq = {
  id: number;
  title: string;
  free?: Array<{ name: string; src: string }>;
  paid?: Array<{ name: string; src: string }>;
  price?: number;
  seriesId: number;
  age: Age;
  thumbnail?: string;
  authorTalk?: string;
  precaution?: string;
};

type PublishRes = {
  id: number;
};

export const publish = async ({ id, ...rest }: PublishReq) => {
  return await apiClient.post<PublishRes>(`webtoon/episode/me/${id}/publish`, { json: rest }).json();
};
