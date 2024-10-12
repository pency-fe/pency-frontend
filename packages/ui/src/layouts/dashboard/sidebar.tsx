import { Box, GlobalStyles, GlobalStylesProps } from "@mui/material";
import { Data, Nav } from "./internal";
import { layoutToken } from "./layout";

// ----------------------------------------------------------------------

export const sidebarToken = {
  bg: "--layout-dashboard-sidebar-bg",
  zIndex: "--layout-dashboard-sidebar-zIndex",
  miniWidth: "--layout-dashboard-sidebar-mini-width",
  width: "--layout-dashboard-sidebar-width",
} as const;

const globalStylesProps: GlobalStylesProps["styles"] = (theme) => ({
  body: {
    [sidebarToken.bg]: theme.palette.background.default,
    [sidebarToken.zIndex]: 1101,
    [sidebarToken.miniWidth]: "88px",
    [sidebarToken.width]: "300px",
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
          bgcolor: `var(${sidebarToken.bg})`,
          zIndex: `var(${sidebarToken.zIndex})`,
          // [TODO] navMiniWidth도 추가해야 한다.
          width: `var(${sidebarToken.width})`,
          transition: theme.transitions.create(["width"], {
            easing: `var(${layoutToken.easing})`,
            duration: `var(${layoutToken.duration})`,
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
