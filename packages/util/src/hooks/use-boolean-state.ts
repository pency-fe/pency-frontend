import { useCallback, useState } from "react";

/**
 * @description
 * https://www.slash.page/ko/libraries/react/react/src/hooks/useBooleanState.i18n
 */
export const useBooleanState = (defaultValue = false) => {
  const [bool, setBool] = useState(defaultValue);

  const setTrue = useCallback(() => {
    setBool(true);
  }, []);

  const setFalse = useCallback(() => {
    setBool(false);
  }, []);

  const toggle = useCallback(() => {
    setBool((b) => !b);
  }, []);

  return { bool, setTrue, setFalse, toggle } as const;
};
