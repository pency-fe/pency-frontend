import { api } from "_core/api";

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
