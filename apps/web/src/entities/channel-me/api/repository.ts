import { Options } from "ky";
import { apiClient } from "@/shared/lib/ky/api-client";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";

// ----------------------------------------------------------------------

type GetChannelMeListRes = Array<{
  id: number;
  title: string;
  url: string;
  image: string;
}>;

export const getChannelMeList = async (options?: Options) => {
  return await apiClient.get<GetChannelMeListRes>("channel/me/list", options).json();
};

// ----------------------------------------------------------------------

type GetChannelMeBrandingDetailReq = {
  url: string;
};

type GetChannelMeBrandingDetailRes = {
  title: string;
  description: string | null;
  url: string;
  image: string | null;
  bgImage: string | null;
};

export const getChannelMeBrandingDetail = async (req: GetChannelMeBrandingDetailReq) => {
  return await apiClient
    .get<GetChannelMeBrandingDetailRes>(`channel/me/${formatChannelUrl(req.url)}/detail/branding`)
    .json();
};

// ----------------------------------------------------------------------

type GetChannelMeLinkDetailReq = {
  url: string;
};

type GetChannelMeLinkDetailRes = Array<{
  linkType: "HOME" | "TWITTER" | "INSTAGRAM";
  url: string;
}>;

export const getChannelMeLinkDetail = async (req: GetChannelMeLinkDetailReq) => {
  return await apiClient.get<GetChannelMeLinkDetailRes>(`channel/me/${formatChannelUrl(req.url)}/detail/link`).json();
};
