import "@pency/ui/global.css";

import { InitThemeProvider } from "@pency/ui/theme";
import { AccessDeniedView, NotFoundView } from "_views";

// 이상한 url로 접근할 때 띄웁니다.
export default function NotFound() {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <InitThemeProvider>
          {/* <NotFoundView /> */}
          <AccessDeniedView />
        </InitThemeProvider>
      </body>
    </html>
  );
}
