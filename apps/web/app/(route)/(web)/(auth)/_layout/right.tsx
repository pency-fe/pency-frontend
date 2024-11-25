"use client";

import { Button } from "@mui/material";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

export default function Right() {
  const pathname = usePathname();

  return (
    <>
      {pathname.startsWith("/login") && (
        <Button LinkComponent={NextLink} href="/signup" variant="text" size="medium">
          회원가입
        </Button>
      )}

      {pathname.startsWith("/signup") && (
        <Button LinkComponent={NextLink} href="/login" variant="text" size="medium">
          로그인
        </Button>
      )}
    </>
  );
}
