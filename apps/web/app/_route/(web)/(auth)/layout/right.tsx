"use client";

import { Link } from "@mui/material";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { useEffect, useState } from "react";

export default function Right() {
  const [link, setLink] = useState("");
  const [href, setHref] = useState("");
  const pathname = usePathname();

  useEffect(() => {
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
  }, [pathname]);

  return (
    <Link component={NextLink} href={href}>
      {link}
    </Link>
  );
}
