import { api } from "_core/api";
import { Genre } from "_core/webtoon/const";
import { Age, CreationType, Pair } from "../const";

// ----------------------------------------------------------------------

type WebtoonPostPublishReq = {
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

type WebtoonPostPublishRes = {
  id: number;
};

export const webtoonPostPublish = async (req: WebtoonPostPublishReq) => {
  return await api.post<WebtoonPostPublishRes>("webtoon/post/publish", { json: req }).json();
};

// ----------------------------------------------------------------------

type GetPostPageRes = {
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
      channelUrl: string;
      image: string;
      title: string;
    };
    likeCount: number;
    createdAt: number;
    keywords: string[];
  }>;
};

export const getPostPage = async ({
  genre = "ALL",
  sort = "LATEST",
  page = 1,
}: {
  genre?: Genre | "ALL";
  sort?: "LATEST" | "POPULAR" | "WPOPULAR";
  page?: number;
}) => {
  return await api.get<GetPostPageRes>(`webtoon/post/page?genre=${genre}&sort=${sort}&page=${page}`).json();
};

// ----------------------------------------------------------------------

type GetPostChannelListRes = Array<{
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
    channelUrl: string;
    image: string;
    title: string;
  };
  likeCount: number;
  createdAt: number;
  keywords: string[];
  preview: string;
}>;

export const getPostChannelList = async ({
  channelUrl,
  sort = "LATEST",
  page = 1,
}: {
  channelUrl: string;
  sort?: "LATEST" | "POPULAR" | "WPOPULAR";
  page?: number;
}) => {
  // [TODO] aip 수정하기
  // return await api
  //   .get<GetPosChannelListRes>(`webtoon/post/channel/list?channelUrl=${channelUrl}&sort=${sort}&page=${page}`)
  //   .json();
  return await api.get<GetPostPageRes>(`webtoon/post/page?sort=${sort}&page=${page}`).json();
};

// ----------------------------------------------------------------------

type WebtoonPostLike = {
  id: number;
};

export const webtoonPostLike = async (req: WebtoonPostLike) => {
  return await api.post(`webtoon/post/${req.id}/like`, { json: req }).json();
};

// ----------------------------------------------------------------------

type WebtoonPostLikeDelete = {
  id: number;
};

export const webtoonPostLikeDelete = async (req: WebtoonPostLikeDelete) => {
  return await api.delete(`webtoon/post/${req.id}/like`, { json: req }).json();
};
