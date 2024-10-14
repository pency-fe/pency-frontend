import { AppBar, AppBarProps, Box, Container, Toolbar, useTheme } from "@mui/material";
import { varAlpha } from "../../../util";
import { useScrollOffSetTop } from "../../../hooks";
import { layoutToken } from "../layout";

type Props = AppBarProps & {
  slots?: {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
  };
};

export function Header({ slots }: Props) {
  const theme = useTheme();
  const { offsetTop } = useScrollOffSetTop();

  return (
    <>
      <AppBar
        sx={{
          position: "sticky",
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
              px: { ["lg"]: 5 },
            }}
          >
            {slots?.left}
            <Box sx={{ display: "flex", flex: "1 1 auto", justifyContent: "center" }}>{slots?.center}</Box>
            {slots?.right}
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
