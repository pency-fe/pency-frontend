import { redirect, useRouter } from "next/navigation";
import { useUserAuthMeContext } from "./user-auth-me-provider";
import { isClient } from "@pency/util";

export const RequireGuest = ({ children }: { children?: React.ReactNode }) => {
  const me = useUserAuthMeContext();
  const router = useRouter();

  if (me.isLoggedIn) {
    if (isClient()) {
      router.push("/login");
      return;
    } else {
      redirect("/login");
    }
  }

  return children;
};
