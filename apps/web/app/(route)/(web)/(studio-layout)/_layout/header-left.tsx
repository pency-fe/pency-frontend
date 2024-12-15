"use client";

import { Box, GlobalStyles, IconButton, useTheme } from "@mui/material";
import { BrandPencyTextLogoIcon, EvaMenuOutlineIcon } from "@pency/ui/components";
import { sidebarClasses, SidebarDrawer } from "@pency/ui/layouts";
import { useToggle } from "@pency/util";
import { StudioSidebarNav } from "./studio-sidebar-nav";

export function HeaderLeft() {
  const theme = useTheme();
  const [isDrawerOpen, toggleDrawer] = useToggle(false);

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            [`&:not(:has(.${sidebarClasses.root}))`]: {
              "& .header-sidebar-drawer-menu": {
                display: "none",
              },
            },
          },
        }}
      />
      <IconButton
        className="header-sidebar-drawer-menu"
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
      <Box component="a" href="/" sx={{ color: "inherit", width: "128px", height: "24px" }}>
        <BrandPencyTextLogoIcon sx={{ width: 1, height: 1 }} />
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
              <Box component="a" href="/" sx={{ color: "inherit", width: "128px", height: "24px" }}>
                <BrandPencyTextLogoIcon sx={{ width: 1, height: 1 }} />
              </Box>
            </>
          ),
          nav: <StudioSidebarNav />,
        }}
      />
    </>
  );
}
