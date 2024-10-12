import { Box, Container, GlobalStyles, GlobalStylesProps, useTheme } from "@mui/material";
import { layoutClasses } from "../classes";

// ----------------------------------------------------------------------

export const layoutToken = {
  easing: "--layout-dashboard-easing",
  duration: "--layout-dashboard-duration",
  navWidth: "--layout-dashboard-nav-width",
} as const;

const globalStylesProps: GlobalStylesProps["styles"] = {
  body: {
    [layoutToken.easing]: "linear",
    [layoutToken.duration]: "120ms",
    [layoutToken.navWidth]: "300px",
  },
};

// ----------------------------------------------------------------------

type Props = {
  slots: {
    header: React.ReactNode;
    sidebar: React.ReactNode;
    footer?: React.ReactNode;
  };
  children?: React.ReactNode;
};

export function Layout({ slots, children }: Props) {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles styles={globalStylesProps} />

      <Box id="root__layout" className={layoutClasses.root}>
        {slots.sidebar}
        <Box
          sx={(theme) => ({
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            [theme.breakpoints.up("lg")]: {
              transition: theme.transitions.create(["padding-left"], {
                easing: `var(${layoutToken.easing})`,
                duration: `var(${layoutToken.duration})`,
              }),
              // [TODO] navMiniWidth도 추가해야 한다.
              pl: `var(${layoutToken.navWidth})`,
            },
          })}
        >
          {slots.header}
          <Box
            component="main"
            className={layoutClasses.main}
            sx={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}
          >
            <Container
              className={layoutClasses.content}
              maxWidth="lg"
              sx={{
                display: "flex",
                flex: "1 1 auto",
                flexDirection: "column",
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
    </>
  );
}
