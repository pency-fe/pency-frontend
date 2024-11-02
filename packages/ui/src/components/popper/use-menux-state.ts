import { useBooleanState } from "@pency/util";
import { useCallback, useRef } from "react";

export const useMenuxState = <T extends HTMLElement = HTMLButtonElement>() => {
  const { bool, setFalse, toggle } = useBooleanState();

  const anchorRef = useRef<T>(null);

  const close = useCallback(
    (e: Event | React.SyntheticEvent) => {
      if (anchorRef.current && anchorRef.current.contains(e.target as HTMLElement)) {
        return;
      }

      setFalse();
    },
    [setFalse],
  );

  return {
    anchorRef,
    isOpen: bool,
    close,
    toggle,
  };
};
