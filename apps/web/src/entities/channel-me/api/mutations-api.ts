import { apiClient } from "@/shared/lib/ky/api-client";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";

type CreateChannelRes = {
  url: string;
};

export const createChannel = async (req: CreateChannelReq) => {
  return await apiClient.post<CreateChannelRes>("channel/me", { json: req }).json();
};

// ----------------------------------------------------------------------

type UpdateBrandingReq = {
  title: string;
  description?: string;
  url: string;
  image?: string;
  bgImage?: string;
  originChannelUrl: string;
};

type UpdateBrandingRes = {
  url: string;
};

export const updateBranding = async ({ originChannelUrl, ...rest }: UpdateBrandingReq) => {
  return await apiClient
    .post<UpdateBrandingRes>(`channel/me/${formatChannelUrl(originChannelUrl)}/detail/branding`, { json: rest })
    .json();
};

type CreateChannelReq = {
  title: string;
  description?: string;
  url: string;
  image?: string;
  bgImage?: string;
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
  return await apiClient.post<GetUploadImageUrlRes>("channel/me/image", { json: req }).json();
};

// ----------------------------------------------------------------------

type GetUploadBgImageUrlReq = {
  contentLength: number;
  contentType: "image/jpeg" | "image/png";
};

type GetUploadBgImageUrlRes = {
  signedUploadUrl: string;
  url: string;
};

export const getUploadBgImageUrl = async (req: GetUploadBgImageUrlReq) => {
  return await apiClient.post<GetUploadBgImageUrlRes>("channel/me/bg-image", { json: req }).json();
};
