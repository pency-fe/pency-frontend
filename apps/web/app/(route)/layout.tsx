import "@pency/ui/global.css";

import { InitQueryClientProvider } from "./init-query-client-provider";
import { InitThemeProvider } from "@pency/ui/theme";
import { Snackbar } from "@pency/ui/components";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorFallback } from "./query-error-boundary";

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <InitQueryClientProvider>
      <InitThemeProvider>
        <ErrorBoundary FallbackComponent={QueryErrorFallback}>{children}</ErrorBoundary>
        <Snackbar />
      </InitThemeProvider>
    </InitQueryClientProvider>
  );
}
