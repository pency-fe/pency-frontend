import { Box, Container, GlobalStyles, SxProps, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const layoutToken = {
  header: {
    height: "--layout-header-height",
    upSmHeight: "--layout-header-up-sm-height",
  },
  sidebar: {
    easing: "--layout-sidebar-easing",
    duration: "--layout-sidebar-duration",
    upSmWidth: "--layout-sidebar-up-sm-width",
    upLgWidth: "--layout-sidebar-up-lg-width",
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
    <>
      <GlobalStyles
        styles={{
          body: {
            [layoutToken.header.height]: "52px",
            [layoutToken.header.upSmHeight]: "56px",
            [layoutToken.sidebar.easing]: "linear",
            [layoutToken.sidebar.duration]: "120ms",
            [layoutToken.sidebar.upSmWidth]: "88px",
            [layoutToken.sidebar.upLgWidth]: "300px",
          },
        }}
      />
      <Box
        sx={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          minHeight: 1,
          ...sx,
        }}
      >
        {slots.header}
        {slots.sidebar}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
            transition: theme.transitions.create(["padding-left"], {
              easing: `var(${layoutToken.sidebar.easing})`,
              duration: `var(${layoutToken.sidebar.duration})`,
            }),
            [theme.breakpoints.up("sm")]: {
              pl: `var(${layoutToken.sidebar.upSmWidth})`,
            },
            [theme.breakpoints.up("lg")]: {
              pl: `var(${layoutToken.sidebar.upLgWidth})`,
            },
          }}
        >
          <Box
            component="main"
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexDirection: "column",
              mt: `var(${layoutToken.header.height})`,
              [theme.breakpoints.up("lg")]: { mt: `var(${layoutToken.header.upSmHeight})` },
            }}
          >
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: "1 1 auto",
                maxWidth: "lg",
                pt: theme.spacing(1),
                pb: theme.spacing(8),
              }}
            >
              {children}
            </Container>
          </Box>
          {slots?.footer}
        </Box>
      </Box>
    </>
  );
}
