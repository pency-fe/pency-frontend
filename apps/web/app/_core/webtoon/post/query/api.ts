import { api } from "_core/api";
import { Genre } from "_core/webtoon/const";
import { Age, CreationType, Pair } from "../const";
import { createSearchParamString } from "@pency/util";

/** **************************************
 * webtoon-me
 *************************************** */

// ----------------------------------------------------------------------

type PublishReq = {
  id?: number;
  channelUrl: string;
  title: string;
  genre: string;
  price?: number;
  free: Array<{ name: string; src: string }>;
  paid: Array<{ name: string; src: string }>;
  thumbnail?: string;
  creationType: string;
  pair: string;
  keywords?: string[];
  age: string;
  authorTalk?: string;
  precaution?: string;
};

type PublishRes = {
  id: number;
};

export const publish = async (req: PublishReq) => {
  return await api.post<PublishRes>("webtoon/me/post/publish", { json: req }).json();
};

// ----------------------------------------------------------------------

/** **************************************
 * webtoon
 *************************************** */

// ----------------------------------------------------------------------

type GetWebtoonPostPageReq = {
  genre?: Genre | "ALL";
  sort?: "LATEST" | "POPULAR" | "WPOPULAR";
  page?: number;
  creationTypes?: Array<CreationType | "ALL">;
  pairs?: Array<Pair | "ALL">;
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
    createdAt: number;
    keywords: string[];
    bookmark: boolean;
    block: true;
  }>;
};

export const getWebtoonPostPage = async ({
  genre = "ALL",
  sort = "LATEST",
  page = 1,
  creationTypes = ["ALL"],
  pairs = ["ALL"],
}: GetWebtoonPostPageReq = {}) => {
  return await api
    .get<GetWebtoonPostPageRes>(
      `webtoon/post/page${createSearchParamString({
        genre,
        sort,
        page,
        creationTypes,
        pairs,
      })}`,
    )
    .json();
};

// ----------------------------------------------------------------------

type LikeReq = {
  id: number;
};

export const like = async (req: LikeReq) => {
  return await api.post(`webtoon/post/${req.id}/like`).json();
};

// ----------------------------------------------------------------------

type UnlikeReq = {
  id: number;
};

export const unlike = async (req: UnlikeReq) => {
  return await api.delete(`webtoon/post/${req.id}/like`).json();
};

// ----------------------------------------------------------------------

type BookmarkReq = {
  id: number;
};

export const bookmark = async (req: BookmarkReq) => {
  return await api.post(`webtoon/post/${req.id}/bookmark`).json();
};

// ----------------------------------------------------------------------

type UnbookmarkReq = {
  id: number;
};

export const unbookmark = async (req: UnbookmarkReq) => {
  return await api.delete(`webtoon/post/${req.id}/bookmark`).json();
};

// ----------------------------------------------------------------------

/** **************************************
 * webtoon-channel
 *************************************** */

// ----------------------------------------------------------------------

type GetWebtoonChannelPostPageRes = Array<{
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
  createdAt: number;
  keywords: string[];
}>;

export const getWebtoonChannelPostPage = async ({
  url,
  sort = "LATEST",
  page = 1,
}: {
  url: string;
  sort?: "LATEST" | "POPULAR" | "WPOPULAR";
  page?: number;
}) => {
  return await api
    .get<GetWebtoonChannelPostPageRes>(`webtoon/channel/@${url}/post/page?sort=${sort}&page=${page}`)
    .json();
};
