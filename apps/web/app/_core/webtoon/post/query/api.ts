import { api } from "_core/api";

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
