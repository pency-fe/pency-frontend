"use client";

import { SimpleLayout } from "@pency/ui/layouts";
import Left from "./left";
import Right from "./right";
import { useMeValue } from "(route)/(web)/me-provider";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: Props) {
  const router = useRouter();
  const me = useMeValue();

  if (me.isLoggedIn) {
    router.push("/");
    return;
  }
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
