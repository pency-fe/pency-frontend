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
