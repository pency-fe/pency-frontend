"use client";

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { BrandPencyTextLogoIcon, EvaArrowIosBackFillIcon, EvaMenuOutlineIcon } from "@pency/ui/components";
import { DashboardSidebarDrawer, PortalDashboardHeaderLeft } from "@pency/ui/layouts";
import { useToggle } from "@pency/util";
import { StudioSidebarNav } from "./_layout/studio-sidebar-nav";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

type HeaderTitleProps = {
  title: string;
  back?: boolean;
};

export function StudioHeaderTitle({ title, back = false }: HeaderTitleProps) {
  const [isDrawerOpen, toggleDrawer] = useToggle(false);
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      <PortalDashboardHeaderLeft>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {back ? (
            <IconButton onClick={router.back}>
              <EvaArrowIosBackFillIcon />
            </IconButton>
          ) : (
            <IconButton
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
          )}

          <Typography variant="h6">{title}</Typography>
        </Box>
      </PortalDashboardHeaderLeft>

      <DashboardSidebarDrawer
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
              <Box component={NextLink} href="/" sx={{ color: "inherit", width: "128px", height: "24px" }}>
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
