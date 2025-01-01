import "@pency/ui/global.css";

import { NotFoundPage } from "@/pages/etc";
import { InitThemeProvider } from "@pency/ui/theme";

// 이상한 url로 접근할 때 띄웁니다.
export default function NotFound() {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <InitThemeProvider>
          <NotFoundPage />
        </InitThemeProvider>
      </body>
    </html>
  );
}
