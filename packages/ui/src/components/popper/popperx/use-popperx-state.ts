"use client";

import { useToggle } from "@pency/util";
import { useCallback, useRef } from "react";

export const usePopperxState = <T extends HTMLElement = HTMLButtonElement>() => {
  const [isOpen, toggle] = useToggle(false);

  const anchorRef = useRef<T>(null);

  const close = useCallback(
    (e: Event | React.SyntheticEvent) => {
      if (anchorRef.current && anchorRef.current.contains(e.target as HTMLElement)) {
        return;
      }

      toggle(false);
    },
    [toggle],
  );

  return {
    anchorRef,
    isOpen,
    close,
    toggle,
  };
};
