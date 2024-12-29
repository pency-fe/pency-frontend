import { redirect, useRouter } from "next/navigation";
import { isClient } from "@pency/util";
import { useUserAuthMeContext } from "./user-auth-me-provider";

export const RequireUser = ({ children }: { children?: React.ReactNode }) => {
  const me = useUserAuthMeContext();
  const router = useRouter();

  if (!me.isLoggedIn) {
    if (isClient()) {
      router.push("/login");
      return;
    } else {
      redirect("/login");
    }
  }

  return children;
};
