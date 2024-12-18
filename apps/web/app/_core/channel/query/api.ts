import { api } from "_core/api";
import { Options } from "ky";

/** **************************************
 * channel
 *************************************** */

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

/** **************************************
 * channel-user-profile
 *************************************** */

// ----------------------------------------------------------------------

type GetChannelUserProfileListReq = {
  id: number;
};

type GetChannelUserProfileListRes = Array<{
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  subscriberCount: number;
}>;

export const getChannelUserProfileList = async (req: GetChannelUserProfileListReq) => {
  return await api.get<GetChannelUserProfileListRes>(`channel/user-profile/${req.id}/list`).json();
};

// ----------------------------------------------------------------------

/** **************************************
 * channel-me
 *************************************** */

// ----------------------------------------------------------------------

function formatUrl(url: string) {
  if (url.startsWith("@")) {
    return url.replace("@", "");
  }

  return url;
}

// ----------------------------------------------------------------------

type GetChannelMeListRes = Array<{
  id: number;
  title: string;
  url: string;
  image: string;
}>;

export const getChannelMeList = async (options?: Options) => {
  return await api.get<GetChannelMeListRes>("channel/me/list", options).json();
};

// ----------------------------------------------------------------------

type CreateChannelReq = {
  title: string;
  description?: string;
  url: string;
  image?: string;
};

type CreateChannelRes = {
  url: string;
};

export const createChannel = async (req: CreateChannelReq) => {
  return await api.post<CreateChannelRes>("channel/me", { json: req }).json();
};

// ----------------------------------------------------------------------

type BlockReq = {
  id: number;
};

export const block = async (req: BlockReq) => {
  return await api.post(`channel/${req.id}/block`).json();
};

// ----------------------------------------------------------------------

type UnblockReq = {
  id: number;
};

export const unblock = async (req: UnblockReq) => {
  return await api.delete(`channel/${req.id}/block`).json();
};

// ----------------------------------------------------------------------

type GetChannelMeBrandingDetailReq = {
  url: string;
};

type GetChannelMeBrandingDetailRes = {
  title: string;
  description: string;
  url: string;
  image: string;
  bgImage: string;
};

export const getChannelMeBrandingDetail = async (req: GetChannelMeBrandingDetailReq) => {
  const url = formatUrl(req.url);

  return await api.get<GetChannelMeBrandingDetailRes>(`channel/me/@${url}/detail/branding`).json();
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
  const url = formatUrl(req.url);

  return await api.get<GetChannelMeLinkDetailRes>(`channel/me/@${url}/detail/link`).json();
};

// ----------------------------------------------------------------------

type UpdateLinkReq = Array<{
  linkType: "HOME" | "TWITTER" | "INSTAGRAM";
  url: string;
}>;

export const updateLink = async ({ req, channelUrl }: { req: UpdateLinkReq; channelUrl: string }) => {
  const url = formatUrl(channelUrl);

  return await api.get(`channel/me/@${url}/detail/link`, { json: req }).json();
};
