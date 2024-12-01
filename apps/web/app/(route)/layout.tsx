import { InitQueryClientProvider } from "./init-query-client-provider";
import { InitThemeProvider } from "@pency/ui/theme";
import { Snackbar } from "@pency/ui/components";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
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
