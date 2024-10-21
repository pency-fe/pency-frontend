export type CompletionState = "SHORT" | "SERIALIZATION" | "COMPLETE" | "BREAK";
export const COMPLETION_STATE: Record<CompletionState, string> = {
  SHORT: "단편",
  SERIALIZATION: "연재",
  COMPLETE: "완결",
  BREAK: "휴재",
} as const;
