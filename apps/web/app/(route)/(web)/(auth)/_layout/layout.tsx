"use client";

import Left from "./left";
import Right from "./right";
import { useMe } from "(route)/(web)/me-provider";
import { redirect, useRouter } from "next/navigation";
import { Header, Main } from "@pency/ui/layouts";
import { isClient } from "@pency/util";

type Props = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: Props) {
  const router = useRouter();
  const me = useMe();

  if (me.isLoggedIn) {
    if (isClient()) {
      router.push("/");
      return;
    } else {
      redirect("/");
    }
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
