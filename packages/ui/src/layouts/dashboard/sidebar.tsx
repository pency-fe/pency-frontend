import { Box, useMediaQuery, useTheme } from "@mui/material";
import { layoutToken } from "./layout";
import { MiniNav, Nav } from "@/components";

type Props = {
  data: Parameters<typeof Nav>[0]["data"];
};

export function Sidebar({ data }: Props) {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1101,
        left: 0,
        display: "none",
        flexDirection: "column",
        height: 1,
        mt: theme.spacing(1),
        bgcolor: theme.vars.palette.background.default,
        transition: theme.transitions.create(["width"], {
          easing: `var(${layoutToken.sidebar.easing})`,
          duration: `var(${layoutToken.sidebar.duration})`,
        }),
        [theme.breakpoints.up("sm")]: {
          top: `var(${layoutToken.header.upSmHeight})`,
          display: "flex",
          width: `var(${layoutToken.sidebar.upSmWidth})`,
          px: theme.spacing(0.5),
        },
        [theme.breakpoints.up("lg")]: {
          width: `var(${layoutToken.sidebar.upLgWidth})`,
          px: theme.spacing(2),
        },
      }}
    >
      {isSmUp && !isLgUp && <MiniNav data={data} />}
      {isLgUp && <Nav data={data} />}
    </Box>
  );
}
