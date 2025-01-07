import { Sort } from "@/features/wt-episode/model/sort-context";
import { Age, CreationType, Genre, Pair, SeriesType } from "@/shared/config/webtoon/const";
import { createSearchParamString } from "@pency/util";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { apiClient } from "@/shared/lib/ky/api-client";

// ----------------------------------------------------------------------

type GetWebtoonSeriesPageReq = {
  genre?: Genre | "ALL";
  sort?: Sort;
  page?: number;
  pair?: Array<Pair | "ALL">;
  creationType?: Array<CreationType | "ALL">;
  seriesType?: Array<SeriesType | "ALL">;
  channelUrl?: string;
};

type GetWebtoonSeriesPageRes = {
  pageCount: number;
  currentPage: number;
  serieses: Array<{
    id: number;
    thumbnail: string | null;
    age: Age;
    creationType: CreationType | "ALL";
    pair: Pair;
    genre: Genre;
    seriesType: SeriesType;
    title: string;
    channel: {
      id: number;
      url: string;
      image: string | null;
      title: string;
    };
    likeCount: number;
    episodeCount: number;
    // [?] 성인 빈 배열
    keywords: Array<string>;
    bookmark: boolean | null;
    block: boolean | null;
  }>;
};

export const getWebtoonSeriesPage = async ({
  genre = "ALL",
  sort = "UPDATE",
  page = 1,
  pair = ["ALL"],
  creationType = ["ALL"],
  seriesType = ["ALL"],
  channelUrl = undefined,
}: GetWebtoonSeriesPageReq = {}) => {
  return await apiClient.get<GetWebtoonSeriesPageRes>(
    `webtoon/series/page${createSearchParamString({
      genre,
      sort,
      page,
      pair,
      creationType,
      seriesType,
      channelUrl: channelUrl ? formatChannelUrl(channelUrl, { prefix: false }) : channelUrl,
    })}`,
  );
};
