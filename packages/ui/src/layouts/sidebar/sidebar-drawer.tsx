import { Box, Drawer, drawerClasses, DrawerProps, useTheme } from "@mui/material";
import { sidebarTokens } from "./sidebar";
import { headerTokens } from "../header";

type SidebarDrawerProps = {
  slots: {
    header: React.ReactNode;
    nav: React.ReactElement;
  };
  slotProps?: {
    drawer?: DrawerProps;
  };
  children?: React.ReactNode;
};

export function SidebarDrawer({ slots, slotProps, children }: SidebarDrawerProps) {
  const theme = useTheme();

  return (
    <Drawer
      {...slotProps?.drawer}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          width: `var(${sidebarTokens.upLgWidth})`,
          bgcolor: theme.vars.palette.background.default,
          px: theme.spacing(2),
        },

        ...slotProps?.drawer?.sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          height: `var(${headerTokens.height})`,
          mb: theme.spacing(1),
        }}
      >
        {slots.header}
      </Box>
      {children}
      {slots.nav}
    </Drawer>
  );
}
