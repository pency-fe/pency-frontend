"use client";

import { redirect, useRouter } from "next/navigation";
import { isClient } from "@pency/util";
import { useAuthContext } from "./auth-provider";

export const RequireUser = ({ children }: { children?: React.ReactNode }) => {
  const { isLoggedIn } = useAuthContext();
  const router = useRouter();

  if (!isLoggedIn) {
    if (isClient()) {
      router.push("/login");
      return;
    } else {
      redirect("/login");
    }
  }

  return children;
};
