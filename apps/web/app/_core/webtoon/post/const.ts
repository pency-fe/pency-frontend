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
