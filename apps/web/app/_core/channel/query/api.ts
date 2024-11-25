import { api } from "_core/api";

// ----------------------------------------------------------------------

type ChannelCreateReq = {
  title: string;
  description?: string;
  url: string;
  image?: string;
};

type ChannelCreateRes = {
  url: string;
};

export const channelCreate = async (req: ChannelCreateReq) => {
  return await api.post<ChannelCreateRes>("channel/create", { json: req }).json();
};

// ----------------------------------------------------------------------
