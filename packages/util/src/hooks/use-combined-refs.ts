import { MutableRefObject, Ref, useCallback } from "react";

type CallbackRef<T> = (ref: T | null) => void;

/**
 * @description
 * https://www.slash.page/ko/libraries/react/react/src/hooks/useCombinedRefs.i18n
 */
export function useCombinedRefs<T>(...refs: Array<Ref<T> | CallbackRef<T>>): Ref<T> {
  return useCallback((value: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T>).current = value;
      }
    }
  }, refs);
}
