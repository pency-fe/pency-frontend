"use client";

import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { MouseEventHandler, useCallback, useRef } from "react";

export function useRipple() {
  const ref = useRef<TouchRippleActions>(null);

  const start: MouseEventHandler = useCallback(
    (e) => {
      ref.current?.start(e);
    },
    [ref],
  );

  const stop: MouseEventHandler = useCallback(
    (e) => {
      ref.current?.stop(e);
    },
    [ref],
  );

  return {
    ref,
    start,
    stop,
  };
}
