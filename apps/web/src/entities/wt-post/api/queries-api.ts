import { createSearchParamString } from "@pency/util";
import { apiClient } from "@/shared/lib/ky/api-client";
import { Age, CreationType, Genre, Pair } from "@/shared/config/webtoon/const";
import { formatChannelUrl } from "@/shared/lib/format/format-channel-url";

type GetWebtoonPostPageReq = {
  genre?: Genre | "ALL";
  sort?: "LATEST" | "POPULAR" | "WPOPULAR";
  page?: number;
  creationTypes?: Array<CreationType | "ALL">;
  pairs?: Array<Pair | "ALL">;
  channelUrl?: string;
};

type GetWebtoonPostPageRes = {
  currentPage: number;
  pageCount: number;
  posts: Array<{
    id: number;
    thumbnail: string;
    age: Age;
    price: number;
    purchased: boolean;
    creationType: CreationType;
    pair: Pair;
    genre: Genre;
    title: string;
    channel: {
      id: number;
      url: string;
      image: string;
      title: string;
    };
    likeCount: number;
    publishedAt: number;
    keywords: string[];
    bookmark: boolean;
    block: boolean;
  }>;
};

export const getWebtoonPostPage = async ({
  genre = "ALL",
  sort = "LATEST",
  page = 1,
  creationTypes = ["ALL"],
  pairs = ["ALL"],
  channelUrl = undefined,
}: GetWebtoonPostPageReq = {}) => {
  return await apiClient
    .get<GetWebtoonPostPageRes>(
      `webtoon/post/page${createSearchParamString({
        genre,
        sort,
        page,
        creationTypes,
        pairs,
        channelUrl: channelUrl ? formatChannelUrl(channelUrl, { prefix: false }) : channelUrl,
      })}`,
    )
    .json();
};

// ----------------------------------------------------------------------
