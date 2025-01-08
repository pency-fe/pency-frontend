import { createSearchParamString } from "@pency/util";
import { Age, CreationType, Genre, Pair, SeriesType } from "@/shared/config/webtoon/const";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";
import { apiClient } from "@/shared/lib/ky/api-client";

// ----------------------------------------------------------------------

type GetWebtoonSeriesPageReq = {
  genres?: Array<Genre>;
  creationTypes?: Array<CreationType>;
  pairs?: Array<Pair>;
  seriesTypes?: Array<SeriesType>;
  page?: number;
  pageType?: "DEFAULT" | "CHANNEL" | "BOOKMARK" | "VIEW";
  sort?: "DEFAULT" | "UPDATE" | "POPULAR" | "WPOPULAR";
  channelUrl?: string;
};

type GetWebtoonSeriesPageRes = {
  pageCount: number;
  currentPage: number;
  serieses: Array<{
    id: number;
    thumbnail: string | null;
    age: Age;
    creationType: CreationType;
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
    episodeCount: number;
    likeCount: number;
    keywords: Array<string>;
    bookmark: boolean | null;
    block: boolean | null;
  }>;
};

export const getWebtoonSeriesPage = async ({
  genres,
  creationTypes,
  pairs,
  seriesTypes,
  page,
  pageType,
  sort,
  channelUrl = undefined,
}: GetWebtoonSeriesPageReq) => {
  return await apiClient
    .get<GetWebtoonSeriesPageRes>(
      `webtoon/series/page${createSearchParamString({
        genres,
        creationTypes,
        pairs,
        seriesTypes,
        page,
        pageType,
        sort,
        channelUrl: channelUrl ? formatChannelUrl(channelUrl, { prefix: false }) : channelUrl,
      })}`,
    )
    .json();
};
