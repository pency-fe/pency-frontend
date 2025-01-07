import { Age } from "@/shared/config/webtoon/const";
import { apiClient } from "@/shared/lib/ky/api-client";
import { Options } from "ky";

type GetWebtoonEpisodeMeReq = {
  id: number;
};

type GetWebtoonEpisodeMeRes = {
  title: string;
  free: Array<{ name: string; src: string }> | null;
  paid: Array<{ name: string; src: string }> | null;
  price: number | null;
  seriesId: number | null;
  age: Age;
  thumbnail: string | null;
  authorTalk: string | null;
  precaution: string | null;
  publish: boolean;
};

export const getWebtoonEpisodeMe = async ({ id }: GetWebtoonEpisodeMeReq, options?: Options) => {
  return await apiClient.get<GetWebtoonEpisodeMeRes>(`webtoon/episode/me/${id}`, options).json();
};
