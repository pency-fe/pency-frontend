import { apiClient } from "@/shared/lib/ky/api-client";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";

// ----------------------------------------------------------------------

type GetChannelReq = {
  url: string;
};

type GetChannelRes = {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  bgImage: string;
  subscriberCount: number;
  wtSeriesCount: number;
  subscribed: boolean;
  userProfile: {
    url: string;
    image: string;
    nickname: string;
  };
  links: Array<{
    linkType: "HOME" | "TWITTER" | "INSTAGRAM";
    url: string;
  }>;
};

export const getChannel = async (req: GetChannelReq) => {
  return await apiClient.get<GetChannelRes>(`channel/${formatChannelUrl(req.url)}`).json();
};
// ----------------------------------------------------------------------
