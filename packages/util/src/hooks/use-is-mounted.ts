import { useEffect, useState } from "react";

/**
 * @description
 * https://www.slash.page/ko/libraries/react/react/src/hooks/useIsMounted.i18n
 */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
