export type Age = "ALL" | "NINETEEN";

export type CreationType = "PRIMARY" | "SECONDARY" | "NARY";
export const CREATION_TYPE_LABEL: Record<CreationType, string> = {
  PRIMARY: "오리지널",
  SECONDARY: "2차창작",
  NARY: "N차창작",
} as const;

export type Pair = "HL" | "BL" | "GL" | "NONE";
export const PAIR_LABEL: Record<Pair, string> = {
  HL: "HL",
  BL: "BL",
  GL: "GL",
  NONE: "없음",
} as const;
