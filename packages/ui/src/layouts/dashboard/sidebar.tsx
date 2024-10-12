import { Box, GlobalStyles, GlobalStylesProps } from "@mui/material";
import { Data, Nav } from "./internal";

// ----------------------------------------------------------------------

export const sidebarToken = {
  bg: "--layout-dashboard-sidebar-bg",
  zIndex: "--layout-dashboard-sidebar-zIndex",
  miniWidth: "--layout-dashboard-sidebar-mini-width",
  width: "--layout-dashboard-sidebar-width",
  easing: "--layout-dashboard-sidebar-easing",
  duration: "--layout-dashboard-sidebar-duration",
} as const;

const globalStylesProps: GlobalStylesProps["styles"] = (theme) => ({
  body: {
    [sidebarToken.bg]: theme.palette.background.default,
    [sidebarToken.zIndex]: 1101,
    [sidebarToken.miniWidth]: "88px",
    [sidebarToken.width]: "300px",
    [sidebarToken.easing]: "linear",
    [sidebarToken.duration]: "120ms",
  },
});

// ----------------------------------------------------------------------

type Props = {
  slots?: {
    bottom?: React.ReactNode;
  };
  data: Data;
};

export function Sidebar({ slots, data }: Props) {
  return (
    <>
      <GlobalStyles styles={globalStylesProps} />
      <Box
        sx={(theme) => ({
          top: 0,
          left: 0,
          height: 1,
          display: "none",
          position: "fixed",
          flexDirection: "column",
          bgcolor: sidebarToken.bg,
          zIndex: sidebarToken.zIndex,
          width: sidebarToken.width,
          transition: theme.transitions.create(["width"], {
            easing: sidebarToken.easing,
            duration: sidebarToken.duration,
          }),
          [theme.breakpoints.up("lg")]: {
            display: "flex",
          },
        })}
      >
        <Nav data={data} />
        {slots?.bottom}
      </Box>
    </>
  );
}
