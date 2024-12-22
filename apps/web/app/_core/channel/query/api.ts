import { formatUrl } from "@pency/util";
import { api } from "_core/api";
import { Options } from "ky";

/** **************************************
 * channel
 *************************************** */

// ----------------------------------------------------------------------

type SubscribeReq = {
  id: number;
};

export const subscribe = async (rep: SubscribeReq) => {
  return await api.post(`channel/${rep.id}/subscribe`).json();
};

// ---------------------------------------------------------------------

type unsubscribeReq = {
  id: number;
};

export const unsubscribe = async (req: unsubscribeReq) => {
  return await api.get(`channel/${req.id}/subscribe`);
};

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

type GuardChannelMeReq = {
  url: string;
};

export const guardChannelMe = async (req: GuardChannelMeReq, options?: Options) => {
  return await api.get<undefined>(`channel/me/${formatUrl(req.url)}/guard`, options).json();
};

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
  return await api.get<GetChannelMeBrandingDetailRes>(`channel/me/${formatUrl(req.url)}/detail/branding`).json();
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

  return await api.get<GetChannelMeLinkDetailRes>(`channel/me/${url}/detail/link`).json();
};

// ----------------------------------------------------------------------

export type UpdateLinkReq = Array<{
  linkType: "HOME" | "TWITTER" | "INSTAGRAM";
  url: string;
}>;

export const updateLink = async ({ req, channelUrl }: { req: UpdateLinkReq; channelUrl: string }) => {
  return await api.post(`channel/me/${formatUrl(channelUrl)}/detail/link`, { json: req }).json();
};
