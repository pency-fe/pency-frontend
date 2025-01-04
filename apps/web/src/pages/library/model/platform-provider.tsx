"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useContext, useMemo } from "react";

export type PlatformValue = "ALL" | "WEBTOON" | "WEBNOVEL";

const PlatformContext = createContext<{ platform: PlatformValue } | undefined>(undefined);

export const usePlatform = () => {
  const context = useContext(PlatformContext);

  if (!context) throw new Error(`부모로 <PlatformProvider /> 컴포넌트가 있어야 합니다.`);

  return context;
};

export const PlatformProvider = ({ children }: { children?: React.ReactNode }) => {
  const searchParams = useSearchParams();

  const platform = useMemo(() => {
    const param = searchParams.get("platform");

    if (param && ["ALL", "WEBTOON", "WEBNOVEL"].includes(param)) {
      return param as PlatformValue;
    }

    return "ALL" as PlatformValue;
  }, [searchParams.get("platform")]);

  return <PlatformContext.Provider value={{ platform }}>{children}</PlatformContext.Provider>;
};
