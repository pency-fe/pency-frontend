"use client";

import { Box, Button } from "@mui/material";
import { BrandPencyTextLogoIcon } from "@pency/ui/components";
import { Header, Main } from "@pency/ui/layouts";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const Left = () => {
  return (
    <Box component="a" href="/" sx={{ display: "flex", alignItems: "center" }}>
      <BrandPencyTextLogoIcon sx={{ width: "fit-content", height: "24px" }} />
    </Box>
  );
};

const Right = () => {
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
};

export const AuthLayout = ({ children }: { children?: React.ReactNode }) => {
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
};
