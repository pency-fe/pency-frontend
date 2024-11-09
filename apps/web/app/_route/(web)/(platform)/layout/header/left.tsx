import { Drawer, IconButton, Stack, drawerClasses, useTheme } from "@mui/material";
import { useBooleanState } from "@pency/util";
import { EvaMenuOutlineIcon, IcomoonFreeYoutube2Icon } from "@pency/ui/components";
import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DashboardLayout } from "@pency/ui/layouts";
import { PlatformNav } from "../platform-nav";

export function Left() {
  const pathname = usePathname();
  const router = useRouter();
  const open = useBooleanState(false);
  const theme = useTheme();

  const pushHome = useCallback(() => {
    if (pathname === "/") {
      router.refresh();
      window.scrollTo({ top: 0, behavior: "smooth" });

      if (open.bool) {
        open.setFalse();
      }
    } else {
      router.push("/");
    }
  }, [pathname, open]);

  useEffect(() => {
    if (open.bool) {
      open.setFalse();
    }
  }, [pathname]);
  return (
    <>
      <IconButton
        sx={{
          ml: theme.spacing(-1),
          mr: theme.spacing(0.5),
          [theme.breakpoints.up("sm")]: {
            display: "none",
          },
        }}
        onClick={open.toggle}
      >
        <EvaMenuOutlineIcon />
      </IconButton>

      <IcomoonFreeYoutube2Icon
        onClick={pushHome}
        sx={{ width: "fit-content", height: "24px", overflow: "unset", cursor: "pointer" }}
      />

      <Drawer
        open={open.bool}
        onClose={open.setFalse}
        sx={{
          [`& .${drawerClasses.paper}`]: {
            width: `var(${DashboardLayout.token.sidebar.upLgWidth})`,
            bgcolor: theme.vars.palette.background.default,
          },
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            height: `var(${DashboardLayout.token.header.height})`,
            mb: theme.spacing(1),
            px: theme.spacing(2),
          }}
        >
          <IconButton
            sx={{
              ml: theme.spacing(-1),
              mr: theme.spacing(0.5),
            }}
            onClick={open.toggle}
          >
            <EvaMenuOutlineIcon />
          </IconButton>

          <IcomoonFreeYoutube2Icon
            onClick={pushHome}
            sx={{ width: "fit-content", height: "24px", overflow: "unset", cursor: "pointer" }}
          />
        </Stack>
        <PlatformNav />
      </Drawer>
    </>
  );
}
