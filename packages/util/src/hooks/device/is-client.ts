/** @tossdocs-ignore */
import { isServer } from "./is-server";

export function isClient() {
  return !isServer();
}
