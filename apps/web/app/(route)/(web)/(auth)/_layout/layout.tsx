"use client";

import Left from "./left";
import Right from "./right";
import { redirect, useRouter } from "next/navigation";
import { Header, Main } from "@pency/ui/layouts";
import { isClient, useFirstMountState } from "@pency/util";
import { useUserAuthMe } from "_core/user";

type Props = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: Props) {
  const router = useRouter();
  const me = useUserAuthMe();
  const isFirstMount = useFirstMountState();

  if (isFirstMount && me.isLoggedIn) {
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
