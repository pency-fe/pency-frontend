"use client";

import "@pency/ui/global.css";
import { Providers } from "./providers";
import { Snackbar } from "@pency/ui/components";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Snackbar />
        </Providers>
      </body>
    </html>
  );
}
