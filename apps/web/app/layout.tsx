"use client";

import { InitThemeProvider } from "@pency/ui";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <InitThemeProvider>{children}</InitThemeProvider>
      </body>
    </html>
  );
}
