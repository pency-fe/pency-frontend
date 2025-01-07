import { Age, CreationType, Genre, Pair, SeriesType } from "@/shared/config/webtoon/const";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { apiClient } from "@/shared/lib/ky/api-client";
import { createSearchParamString } from "@pency/util";

type GetWebtoonSeriesMeReq = {
  id: number;
};

type GetWebtoonSeriesMeRes = {
  thumbnail: string | null;
  age: Age;
  creationType: CreationType;
  pair: Pair;
  genre: Genre;
  seriesType: SeriesType;
  title: string;
  description: string;
  keywords: string[];
};

export const getWebtoonSeriesMe = async ({ id }: GetWebtoonSeriesMeReq) => {
  return await apiClient.get<GetWebtoonSeriesMeRes>(`webtoon/series/me/${id}`).json();
};

// ----------------------------------------------------------------------

type GetWebtoonSeriesMeListReq = {
  channelUrl: string;
};

type GetWebtoonSeriesMeListRes = Array<{
  id: number;
  thumbnail: string | null;
  title: string;
  episodeCount: number;
}>;

export const getWebtoonSeriesMeList = async ({ channelUrl }: GetWebtoonSeriesMeListReq) => {
  return await apiClient
    .get<GetWebtoonSeriesMeListRes>(
      `webtoon/series/me/list${createSearchParamString({
        channelUrl: formatChannelUrl(channelUrl, { prefix: false }),
      })}`,
    )
    .json();
};
