import { Genre, Status } from "@/shared/config/webtoon/const";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { apiClient } from "@/shared/lib/ky/api-client";
import { createSearchParamString } from "@pency/util";

type GetWtSeriesMeReq = {
  id: number;
};

type GetWtSeriesMeRes = {
  image: string | null;
  status: Status;
  genre: Genre;
  title: string;
  description: string;
  keywords: string[];
};

export const getWtSeriesMe = async ({ id }: GetWtSeriesMeReq) => {
  return await apiClient.get<GetWtSeriesMeRes>(`webtoon/series/me/${id}`).json();
};

// ----------------------------------------------------------------------

type GetWtSeriesMeListReq = {
  channelUrl: string;
};

type GetWtSeriesMeListRes = Array<{
  id: number;
  image: string | null;
  title: string;
  postCount: number;
}>;

export const getWtSeriesMeList = async ({ channelUrl }: GetWtSeriesMeListReq) => {
  return await apiClient.get<GetWtSeriesMeListRes>(
    `webtoon/series/me/list${createSearchParamString({
      channelUrl: formatChannelUrl(channelUrl, { prefix: false }),
    })}`,
  );
};
