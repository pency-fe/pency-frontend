import { api } from "_core/api";
import { Genre } from "_core/webtoon/const";
import { Age, CreationType, Pair } from "../const";
import { createSearchParamString, formatUrl } from "@pency/util";
import { Options } from "ky";

/** **************************************
 * webtoon-post-me
 *************************************** */

// ----------------------------------------------------------------------

type PublishReq = {
  id: number;
  title: string;
  genre: Genre;
  price?: number;
  free: Array<{ name: string; src: string }>;
  paid: Array<{ name: string; src: string }>;
  thumbnail?: string;
  creationType: CreationType;
  pair: Pair;
  keywords?: string[];
  age: Age;
  authorTalk?: string;
  precaution?: string;
};

type PublishRes = {
  id: number;
};

export const publish = async ({ id, ...rest }: PublishReq) => {
  return await api.post<PublishRes>(`webtoon/post/me/${id}/publish`, { json: rest }).json();
};

// ----------------------------------------------------------------------

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
  return await api.get<GetWebtoonPostMeRes>(`webtoon/post/me/${id}`, options).json();
};

// ----------------------------------------------------------------------

type ProvisionReq = {
  channelUrl: string;
};

type ProvisionRes = {
  id: number;
};

export const provision = async (req: ProvisionReq) => {
  return await api.post<ProvisionRes>("webtoon/post/me/provision", { json: req }).json();
};

// ----------------------------------------------------------------------

type SaveReq = {
  id: number;
  title: string;
  genre: Genre;
  price: number;
  free: Array<{
    name: string;
    src: string;
  }>;
  paid: Array<{
    name: string;
    src: string;
  }>;
};

export const save = async ({ id, ...rest }: SaveReq) => {
  return await api
    .post(`webtoon/post/me/${id}/save`, {
      json: rest,
    })
    .json();
};

// ----------------------------------------------------------------------

type GetUploadCutImageUrlReq = {
  contentLength: number;
  contentType: "image/jpeg" | "image/png" | "image/gif";
};

type GetUploadCutImageUrlRes = {
  signedUploadUrl: string;
  url: string;
};

export const getUploadCutImageUrl = async (req: GetUploadCutImageUrlReq) => {
  return await api.post<GetUploadCutImageUrlRes>("webtoon/post/me/cut-image", { json: req }).json();
};

// ----------------------------------------------------------------------

type GetUploadThumbnailUrlReq = {
  contentLength: number;
  contentType: "image/jpeg" | "image/png";
};

type GetUploadThumbnailUrlRes = {
  signedUploadUrl: string;
  url: string;
};

export const getUploadThumbnailUrl = async (req: GetUploadThumbnailUrlReq) => {
  return await api.post<GetUploadThumbnailUrlRes>("webtoon/post/me/thumbnail", { json: req }).json();
};

// ----------------------------------------------------------------------

/** **************************************
 * webtoon-post
 *************************************** */

// ----------------------------------------------------------------------

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
  return await api
    .get<GetWebtoonPostPageRes>(
      `webtoon/post/page${createSearchParamString({
        genre,
        sort,
        page,
        creationTypes,
        pairs,
        channelUrl: channelUrl ? formatUrl(channelUrl, { prefix: false }) : channelUrl,
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

type ReportReq = {
  id: number;
  reason: "ADULT" | "SPAM" | "ILLEGAL" | "VIOLENCE" | "PAID_MISINFORMATION" | "OTHER";
  detail: string;
};

export const report = async (req: ReportReq) => {
  return await api.post(`webtoon.post/${req.id}/report`, { json: { reason: req.reason, detail: req.detail } }).json();
};

// ----------------------------------------------------------------------
