import { api } from "_core/api";

type getUploadImageUrlReq = {
  contentLength: number;
  contentType: "image/jpeg" | "image/png" | "image/gif";
};

type getUploadImageUrlRes = {
  signedUploadUrl: string;
  url: string;
};

export const getUploadImageUrl = async (req: getUploadImageUrlReq) => {
  return await api.post<getUploadImageUrlRes>("s3/upload/image/url", { json: req }).json();
};
