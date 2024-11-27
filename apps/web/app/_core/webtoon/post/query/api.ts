import { Genre } from "_core/webtoon/const";
import { Age, CreationType, Pair } from "../const";
import { api } from "_core/api";

// ----------------------------------------------------------------------

type WebtoonPostPublishReq = {
  channelUrl: string;
  postId?: string;
  title: string;
  genre: Genre;
  thumbnail?: string;
  creationType: CreationType;
  pair: Pair;
  keywords?: string[];
  age: Age;
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
