import { redirect, useRouter } from "next/navigation";
import { useAuthContext } from "./auth-provider";
import { isClient } from "@pency/util";

export const RequireGuest = ({ children }: { children?: React.ReactNode }) => {
  const { isLoggedIn } = useAuthContext();
  const router = useRouter();

  if (isLoggedIn) {
    if (isClient()) {
      router.push("/login");
      return;
    } else {
      redirect("/login");
    }
  }

  return children;
};
