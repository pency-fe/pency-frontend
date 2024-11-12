"use client";

import type {} from "@mui/material/themeCssVarsAugmentation";
import type {} from "@mui/lab/themeAugmentation";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline } from "@mui/material";
import {
  ATTRIBUTE,
  COLOR_SCHEME_STORAGE_KEY,
  ConfigThemeProvider,
  DEFAULT_MODE,
  MODE_STORAGE_KEY,
} from "./config-theme-provider";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

type Props = {
  children: React.ReactNode;
};

export function InitThemeProvider({ children }: Props) {
  return (
    <>
      <InitColorSchemeScript
        defaultMode={DEFAULT_MODE}
        modeStorageKey={MODE_STORAGE_KEY}
        attribute={ATTRIBUTE}
        colorSchemeStorageKey={COLOR_SCHEME_STORAGE_KEY}
      />
      <AppRouterCacheProvider options={{ key: "css" }}>
        <ConfigThemeProvider>
          <CssBaseline />
          {children}
        </ConfigThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
}
