import "@pency/ui/global.css";

import { InitQueryClientProvider } from "./init-query-client-provider";
import { InitThemeProvider } from "@pency/ui/theme";
import { Snackbar } from "@pency/ui/components";

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <InitQueryClientProvider>
      <InitThemeProvider>
        {children}
        <Snackbar />
      </InitThemeProvider>
    </InitQueryClientProvider>
  );
}
