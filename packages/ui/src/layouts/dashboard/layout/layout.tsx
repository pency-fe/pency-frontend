import { Box, Container, SxProps, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const layoutToken = {
  header: {
    mobileHeight: "--layout-header-mobile-height",
    desktopHeight: "--layout-header-desktop-height",
  },
  sidebar: {
    easing: "--layout-sidebar-easing",
    duration: "--layout-sidebar-duration",
    miniWidth: "--layout-sidebar-mini-width",
    width: "--layout-sidebar-width",
  },
} as const;

type Props = {
  slots: {
    header: React.ReactNode;
    sidebar: React.ReactNode;
    footer?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
};

export function Layout({ slots, sx, children }: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        minHeight: 1,
        [layoutToken.header.mobileHeight]: "64px",
        [layoutToken.header.desktopHeight]: "72px",
        [layoutToken.sidebar.easing]: "linear",
        [layoutToken.sidebar.duration]: "120ms",
        [layoutToken.sidebar.miniWidth]: "88px",
        [layoutToken.sidebar.width]: "300px",
        ...sx,
      }}
    >
      {slots.sidebar}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "1 1 auto",
          [theme.breakpoints.up("lg")]: {
            transition: theme.transitions.create(["padding-left"], {
              easing: `var(${layoutToken.sidebar.easing})`,
              duration: `var(${layoutToken.sidebar.duration})`,
            }),
            pl: `var(${layoutToken.sidebar.width})`,
          },
        }}
      >
        {slots.header}
        <Box component="main" sx={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "1 1 auto",
              maxWidth: "lg",
              pt: theme.spacing(1),
              pb: theme.spacing(8),
              [theme.breakpoints.up("lg")]: {
                px: theme.spacing(5),
              },
            }}
          >
            {children}
          </Container>
        </Box>
        {slots?.footer}
      </Box>
    </Box>
  );
}
