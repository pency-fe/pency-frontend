"use client";

import { SimpleLayout } from "@pency/ui/layouts";

type Props = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: Props) {
  return (
    <SimpleLayout
      slots={{
        header: <SimpleLayout.Header slots={{ left: "왼쪽", right: "오른쪽" }} />,
      }}
    >
      {children}
    </SimpleLayout>
  );
}
