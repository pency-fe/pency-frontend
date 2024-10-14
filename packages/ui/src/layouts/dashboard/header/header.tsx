import { AppBar, AppBarProps, Box, Container, IconButton, Toolbar, useTheme } from "@mui/material";
import { layoutToken } from "../layout";
import { Iconify } from "../../../components";

type Props = AppBarProps & {
  slots?: {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
  };
};

export function Header({ slots }: Props) {
  const theme = useTheme();

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
                display: "inline-flex",
                ml: "-8px",
                mr: "4px",
                [theme.breakpoints.up("sm")]: {
                  display: "none",
                },
              }}
            >
              <Iconify icon="eva:menu-outline" />
            </IconButton>
            <Iconify icon="icomoon-free:youtube2" sx={{ width: "fit-content", height: "20px" }} />
            {slots?.left}
            <Box sx={{ display: "flex", flex: "1 1 auto", justifyContent: "center" }}>{slots?.center}</Box>
            {slots?.right}
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
