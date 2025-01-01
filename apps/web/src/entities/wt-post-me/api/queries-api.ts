import { Age, CreationType, Genre, Pair } from "@/shared/config/webtoon/const";
import { apiClient } from "@/shared/lib/ky/api-client";
import { Options } from "ky";

type GetWebtoonPostMeReq = {
  id: number;
};

type GetWebtoonPostMeRes = {
  title: string;
  genre: Genre;
  price: number | null;
  free: Array<{ name: string; src: string }> | null;
  paid: Array<{ name: string; src: string }> | null;
  thumbnail: string | null;
  creationType: CreationType;
  pair: Pair;
  keywords: Array<string>;
  age: Age;
  authorTalk: string | null;
  precaution: string | null;
  publish: boolean;
};

export const getWebtoonPostMe = async ({ id }: GetWebtoonPostMeReq, options?: Options) => {
  return await apiClient.get<GetWebtoonPostMeRes>(`webtoon/post/me/${id}`, options).json();
};
