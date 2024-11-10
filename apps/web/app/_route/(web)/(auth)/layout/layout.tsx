"use client";

import { SimpleLayout } from "@pency/ui/layouts";
import Left from "./left";
import Right from "./right";

type Props = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: Props) {
  return (
    <SimpleLayout
      slots={{
        header: (
          <SimpleLayout.Header
            slots={{
              left: <Left />,
              right: <Right />,
            }}
          />
        ),
      }}
    >
      {children}
    </SimpleLayout>
  );
}
