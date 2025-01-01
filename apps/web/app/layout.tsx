import { InitQueryClientProvider } from "@/app/lib/init-query-client-provider";
import { Snackbar } from "@pency/ui/components";
import { InitThemeProvider } from "@pency/ui/theme";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <InitQueryClientProvider>
          <InitThemeProvider>
            {children}
            <Snackbar />
          </InitThemeProvider>
        </InitQueryClientProvider>
      </body>
    </html>
  );
}
