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
