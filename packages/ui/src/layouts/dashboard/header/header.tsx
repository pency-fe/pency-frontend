import {
  AppBar,
  AppBarProps,
  Box,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  drawerClasses,
  useTheme,
} from "@mui/material";
import { layoutToken } from "../layout";
import { Iconify } from "../../../components";
import { NavData } from "../sidebar/types";
import { useBooleanState } from "@pency/util";
import { Nav } from "../sidebar";
import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

type Props = AppBarProps & {
  data: NavData;
  slots?: {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
  };
};

export function Header({ data, slots }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const open = useBooleanState(false);

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
      <AppBar
        sx={{
          zIndex: 1100,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: "auto",
            height: `var(${layoutToken.header.mobileHeight})`,
            transition: theme.transitions.create(["height"], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
            bgcolor: theme.vars.palette.background.default,

            [theme.breakpoints.up("sm")]: {
              minHeight: "auto",
              height: `var(${layoutToken.header.desktopHeight})`,
            },
          }}
        >
          <Container
            maxWidth={false}
            sx={{
              height: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
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
              <Iconify icon="eva:menu-outline" />
            </IconButton>

            <Iconify
              icon="icomoon-free:youtube2"
              onClick={pushHome}
              sx={{ width: "fit-content", height: "24px", overflow: "unset", cursor: "pointer" }}
            />

            {slots?.left}
            <Box sx={{ display: "flex", flex: "1 1 auto", justifyContent: "center" }}>{slots?.center}</Box>
            {slots?.right}
          </Container>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open.bool}
        onClose={open.setFalse}
        sx={{
          [`& .${drawerClasses.paper}`]: {
            width: `var(${layoutToken.sidebar.width})`,
            bgcolor: theme.vars.palette.background.default,
          },
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            height: `var(${layoutToken.header.mobileHeight})`,
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
            <Iconify icon="eva:menu-outline" />
          </IconButton>
          <Iconify
            icon="icomoon-free:youtube2"
            onClick={pushHome}
            sx={{ width: "fit-content", height: "24px", overflow: "unset", cursor: "pointer" }}
          />
        </Stack>
        <Nav data={data} />
      </Drawer>
    </>
  );
}
