"use client";

import { InitThemeProvider } from "@pency/ui/theme";
import "@pency/ui/global.css";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <h1>layout</h1>
        <InitThemeProvider>{children}</InitThemeProvider>
      </body>
    </html>
  );
}
