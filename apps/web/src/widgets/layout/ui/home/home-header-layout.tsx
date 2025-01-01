"use client";

import { MouseEventHandler } from "react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Button,
  GlobalStyles,
  IconButton,
  InputAdornment,
  inputBaseClasses,
  TextField,
  useTheme,
} from "@mui/material";
import {
  BrandPencyTextLogoIcon,
  EvaMenuOutlineIcon,
  IcRoundSearchIcon,
  MingcuteBox2LineIcon,
  MingcuteNotificationLineIcon,
} from "@pency/ui/components";
import { Header, sidebarClasses, SidebarDrawer } from "@pency/ui/layouts";
import { useToggle } from "@pency/util";
import { useAuthContext } from "@/entities/@auth";
import { UserProfileAvatar } from "../user-profile-avatar";
import { HomeSidebarNav } from "./home-sidebar-nav";

const Left = () => {
  const [isDrawerOpen, toggleDrawer] = useToggle(false);
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const handleLogoClick: MouseEventHandler = (e) => {
    if (pathname !== "/") {
      e.preventDefault();
      router.push("/");
    }
  };

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            [`&:not(:has(.${sidebarClasses.root}))`]: {
              "& .home-header-sidebar-drawer-button": {
                display: "none",
              },
            },
          },
        }}
      />
      <IconButton
        className="home-header-sidebar-drawer-button"
        onClick={() => toggleDrawer(true)}
        sx={{
          mr: 1,
          [theme.breakpoints.up("sm")]: {
            display: "none",
          },
        }}
      >
        <EvaMenuOutlineIcon />
      </IconButton>
      <Box component="a" href="/" onClick={handleLogoClick} sx={{ display: "flex", alignItems: "center" }}>
        <BrandPencyTextLogoIcon sx={{ width: "fit-content", height: "24px" }} />
      </Box>
      <SidebarDrawer
        slotProps={{
          drawer: {
            open: isDrawerOpen,
            onClose: () => toggleDrawer(false),
          },
        }}
        slots={{
          header: (
            <>
              <IconButton
                onClick={() => toggleDrawer(false)}
                sx={{
                  mr: 1,
                }}
              >
                <EvaMenuOutlineIcon />
              </IconButton>
              <Box component="a" href="/" onClick={handleLogoClick} sx={{ display: "flex", alignItems: "center" }}>
                <BrandPencyTextLogoIcon sx={{ width: "fit-content", height: "24px" }} />
              </Box>
            </>
          ),
          nav: <HomeSidebarNav />,
        }}
      />
    </>
  );
};

const Right = () => {
  const { isLoggedIn } = useAuthContext();
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <TextField
        placeholder="검색어를 입력해 주세요."
        variant="filled"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IcRoundSearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          [`& .${inputBaseClasses.root}`]: { height: 36 },
          [`& .${inputBaseClasses.input}`]: { pl: 1.5, py: 0 },
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      />

      <IconButton
        sx={{
          [theme.breakpoints.up("sm")]: {
            display: "none",
          },
        }}
      >
        <IcRoundSearchIcon />
      </IconButton>

      {isLoggedIn ? (
        <>
          <IconButton
            sx={{
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            }}
          >
            <MingcuteNotificationLineIcon />
          </IconButton>
          <IconButton
            LinkComponent={NextLink}
            href="/library/view"
            sx={{
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            }}
          >
            <MingcuteBox2LineIcon />
          </IconButton>

          <UserProfileAvatar />
        </>
      ) : (
        <>
          <Button LinkComponent={NextLink} href="/login" variant="text" size="medium">
            로그인
          </Button>
          <Button LinkComponent={NextLink} href="/signup" variant="text" size="medium" color="primary">
            회원가입
          </Button>
        </>
      )}
    </Box>
  );
};

export const HomeHeaderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header slots={{ left: <Left />, right: <Right /> }} />
      {children}
    </>
  );
};
