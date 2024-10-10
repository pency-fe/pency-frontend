import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline } from "@mui/material";
import { ConfigThemeProvider } from "./config-theme-provider";

type Props = {
  children: React.ReactNode;
};

export function InitThemeProvider({ children }: Props) {
  return (
    <>
      <AppRouterCacheProvider options={{ key: "css" }}>
        <ConfigThemeProvider>
          <CssBaseline />
          {children}
        </ConfigThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
}
