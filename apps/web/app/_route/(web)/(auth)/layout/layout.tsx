"use client";

import "@pency/ui/global.css";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return <>{children}</>;
}
