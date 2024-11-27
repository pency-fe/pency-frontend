import { api } from "_core/api";
import { Genre } from "_core/webtoon/const";
import { Options } from "ky";
import { Age, CreationType, Pair } from "../const";

// ----------------------------------------------------------------------

type WebtoonPostPublishReq = {
  channelUrl: string;
  postId?: string;
  title: string;
  genre: string;
  thumbnail?: string;
  creationType: string;
  pair: string;
  keywords?: string[];
  age: string;
  authorTalk?: string;
  precaution?: string;
  price?: number;
};

type WebtoonPostPublishRes = {
  postId: string;
};

export const webtoonPostPublish = async (req: WebtoonPostPublishReq) => {
  return await api.post<WebtoonPostPublishRes>("webtoon/post/publish", { json: req }).json();
};

// ----------------------------------------------------------------------

type GetPostListRes = Array<{
  postId: string;
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

export const getPostList = async ({
  genre = "ALL",
  sort = "LATEST",
  page = 1,
}: {
  genre?: Genre | "ALL";
  sort?: "LATEST" | "POPULAR" | "WPOPULAR";
  page?: number;
}) => {
  return await api.get<GetPostListRes>(`webtoon/post/list?genre=${genre}&sort=${sort}&page=${page}`).json();
};
