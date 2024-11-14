export enum AGE_LABEL {
  ALL = "전체",
  NINETEEN = "성인",
}
export type Age = keyof typeof AGE_LABEL;

export enum CREATION_TYPE_LABEL {
  PRIMARY = "오리지널",
  SECONDARY = "2차창작",
  NARY = "N차창작",
}
export type CreationType = keyof typeof CREATION_TYPE_LABEL;

export enum PAIR_LABEL {
  NONE = "없음",
  HL = "HL",
  BL = "BL",
  GL = "GL",
}
export type Pair = keyof typeof PAIR_LABEL;
