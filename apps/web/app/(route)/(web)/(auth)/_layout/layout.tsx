"use client";

import Left from "./left";
import Right from "./right";
import { useMeValue } from "(route)/(web)/me-provider";
import { useRouter } from "next/navigation";
import { Header, Main } from "@pency/ui/layouts";

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
    <>
      <Header
        slots={{
          left: <Left />,
          right: <Right />,
        }}
      />
      <Main variant="compact">{children}</Main>
    </>
  );
}
