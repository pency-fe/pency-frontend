"use client";

import "@pency/ui/global.css";

type Props = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: Props) {
  return <>{children}</>;
}
