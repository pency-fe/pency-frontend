import "@pency/ui/global.css";

import { InitThemeProvider } from "@pency/ui/theme";
import { NotFoundView } from "_views";

export default function NotFound() {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <InitThemeProvider>
          <NotFoundView />
        </InitThemeProvider>
      </body>
    </html>
  );
}
