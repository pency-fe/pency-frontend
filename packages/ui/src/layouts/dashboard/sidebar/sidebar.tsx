import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Nav } from "./nav";
import { NavData } from "./types";
import { layoutToken } from "../layout";
import { MiniNav } from "./mini-nav";

type Props = {
  data: NavData;
};

export function Sidebar({ data }: Props) {
  const theme = useTheme();
  const isBetweenSmAndLg = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isLgOrAbove = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1101,
        top: 0,
        left: 0,
        display: "none",
        flexDirection: "column",
        width: `var(${layoutToken.sidebar.miniWidth})`,
        height: 1,
        bgcolor: theme.vars.palette.background.default,
        transition: theme.transitions.create(["width"], {
          easing: `var(${layoutToken.sidebar.easing})`,
          duration: `var(${layoutToken.sidebar.duration})`,
        }),
        [theme.breakpoints.between("sm", "lg")]: {
          display: "flex",
          width: `var(${layoutToken.sidebar.miniWidth})`,
        },
        [theme.breakpoints.up("lg")]: {
          display: "flex",
          width: `var(${layoutToken.sidebar.width})`,
        },
      }}
    >
      {isBetweenSmAndLg && <MiniNav data={data} />}
      {isLgOrAbove && <Nav data={data} />}
    </Box>
  );
}
