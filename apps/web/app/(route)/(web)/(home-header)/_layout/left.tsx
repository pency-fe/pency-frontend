"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IcomoonFreeYoutube2Icon } from "@pency/ui/components";

export function Left() {
  const pathname = usePathname();
  const router = useRouter();

  const pushHome = useCallback(() => {
    if (pathname === "/") {
      router.refresh();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  }, [pathname, router]);

  return (
    <IcomoonFreeYoutube2Icon
      onClick={pushHome}
      sx={{ width: "fit-content", height: "24px", overflow: "unset", cursor: "pointer" }}
    />
  );
}
