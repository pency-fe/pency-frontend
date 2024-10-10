import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { themeMode } from "./core";
import { CssBaseline } from "@mui/material";
import { ConfigThemeProvider } from "./config-theme-provider";

type Props = {
  children: React.ReactNode;
};

export function InitThemeProvider({ children }: Props) {
  return (
    <>
      <InitColorSchemeScript modeStorageKey={themeMode.modeStorageKey} defaultMode={themeMode.defaultMode} />
      <AppRouterCacheProvider options={{ key: "css" }}>
        <ConfigThemeProvider>
          <CssBaseline />
          {children}
        </ConfigThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
}
