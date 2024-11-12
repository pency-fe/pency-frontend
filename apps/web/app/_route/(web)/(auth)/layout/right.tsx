"use client";

import { Button } from "@mui/material";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { useEffect, useState } from "react";

export default function Right() {
  const [link, setLink] = useState("");
  const [href, setHref] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    console.log("??");
    if (pathname.startsWith("/login")) {
      setLink("회원가입");
      setHref("/signup");
      return;
    }

    if (pathname.startsWith("/signup")) {
      setLink("로그인");
      setHref("/login");
      return;
    }
  }, [pathname.startsWith("/login"), pathname.startsWith("/signup")]);

  return (
    <Button LinkComponent={NextLink} href={href} variant="text" size="medium">
      {link}
    </Button>
  );
}
