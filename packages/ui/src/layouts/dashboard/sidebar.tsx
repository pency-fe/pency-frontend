import { Box, useMediaQuery, useTheme } from "@mui/material";
import { layoutToken } from "./layout";

type Props = {
  slots: {
    smUpNav: React.ReactNode;
    lgUpNav: React.ReactNode;
  };
};

export function Sidebar({ slots }: Props) {
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
        },
        [theme.breakpoints.up("lg")]: {
          width: `var(${layoutToken.sidebar.upLgWidth})`,
        },
      }}
    >
      {isSmUp && !isLgUp && slots.smUpNav}
      {isLgUp && slots.lgUpNav}
    </Box>
  );
}
