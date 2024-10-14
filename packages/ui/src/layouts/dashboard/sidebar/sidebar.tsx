import { Box, useTheme } from "@mui/material";
import { Nav } from "./nav";
import { NavData } from "./types";
import { layoutToken } from "../layout";
import { MiniNav } from "./mini-nav";

type Props = {
  data: NavData;
};

export function Sidebar({ data }: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1101,
        top: 0,
        left: 0,
        display: "none",
        flexDirection: "column",
        // width: `var(${layoutToken.sidebar.width})`,
        width: `var(${layoutToken.sidebar.miniWidth})`,
        height: 1,
        bgcolor: theme.vars.palette.background.default,
        transition: theme.transitions.create(["width"], {
          easing: `var(${layoutToken.sidebar.easing})`,
          duration: `var(${layoutToken.sidebar.duration})`,
        }),
        [theme.breakpoints.up("lg")]: {
          display: "flex",
        },
      }}
    >
      {/* <Nav data={data} /> */}
      <MiniNav data={data} />
    </Box>
  );
}
