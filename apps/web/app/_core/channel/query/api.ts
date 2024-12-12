import { api } from "_core/api";
import { Options } from "ky";

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
  return await api.post<CreateChannelRes>("channel", { json: req }).json();
};

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

export const getChannelUserProfileList = async (req: GetChannelUserProfileListReq, options?: Options) => {
  return await api.get<GetChannelUserProfileListRes>(`channel/user-profile/${req.id}/list`, options).json();
};

// ----------------------------------------------------------------------
