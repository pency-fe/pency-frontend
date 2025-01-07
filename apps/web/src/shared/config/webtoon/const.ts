export type Genre =
  | "ROMANCE"
  | "FANTASY"
  | "ROFAN"
  | "ACTION"
  | "DAILY"
  | "COMIC"
  | "DRAMA"
  | "THRILLER"
  | "MARTIAL"
  | "SPORTS"
  | "SELF"
  | "ETC";

export const GENRE_LABEL: Record<Genre, string> = {
  ROMANCE: "로맨스",
  FANTASY: "판타지",
  ROFAN: "로판",
  ACTION: "액션",
  DAILY: "일상",
  COMIC: "개그",
  DRAMA: "드라마",
  THRILLER: "스릴러",
  MARTIAL: "무협",
  SPORTS: "스포츠",
  SELF: "자기계발",
  ETC: "기타",
} as const;

export type Age = "ALL" | "NINETEEN";
export const AGE_LABEL: Record<Age, string> = {
  ALL: "전체",
  NINETEEN: "성인",
} as const;

export type CreationType = "PRIMARY" | "SECONDARY" | "NARY";
export const CREATION_TYPE_LABEL: Record<CreationType, string> = {
  PRIMARY: "오리지널",
  SECONDARY: "2차창작",
  NARY: "N차창작",
};

export type Pair = "NONE" | "HL" | "BL" | "GL";
export const PAIR_LABEL: Record<Pair, string> = {
  NONE: "없음",
  HL: "HL",
  BL: "BL",
  GL: "GL",
} as const;

export type SeriesType = "SHORT" | "SERIAL" | "FINISHED";
export const SERIES_TYPE_LABEL: Record<SeriesType, string> = {
  SHORT: "단편",
  SERIAL: "연재",
  FINISHED: "완결",
} as const;
