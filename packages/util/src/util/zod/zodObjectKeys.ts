import { objectKeys } from "../object";
import { zodArray } from "./zodArray";

export function zodObjectKeys<Type extends Record<PropertyKey, unknown>>(obj: Type) {
  return zodArray(objectKeys(obj));
}
